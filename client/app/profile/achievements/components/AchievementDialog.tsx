import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMaterials } from "@/context/MaterialsContext";
import { Achievement } from "@shared/types";
import MaterialCardSmall from "./MaterialCardSmall";
import getAchievementIcon from "../utils/getAchievementIcon";
import { useAuth } from "@/context/AuthContext";
import { useAccess } from "@/hooks/useAccess";
import { Button } from "@/components/ui/button";
import AchievementForm from "./AchievmentForm";

interface AchievementDialogProps {
  achievement: Achievement | null;
  onClose: () => void;
  materials: typeof useMaterials extends () => { materials: infer M }
    ? M
    : never;
}

const AchievementDialog: React.FC<AchievementDialogProps> = ({
  achievement,
  onClose,
  materials,
}) => {
  const { userData } = useAuth();
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!achievement) return null;

  const { title, category, description, requiredMaterials } = achievement;
  const isGottenAchievement = userData?.achievements
    ? userData.achievements.includes(achievement._id)
    : false;

  console.log(isEditOpen);

  return (
    <>
      <Dialog open={!!achievement} onOpenChange={onClose}>
        <DialogContent
          className={`${isGottenAchievement ? "ring-2 ring-blue-500" : ""}`}
        >
          <DialogHeader>
            <div className="flex gap-3">
              <div className="h-[55px]">
                {getAchievementIcon(category, isGottenAchievement)}
              </div>
              <div className="flex flex-col justify-between">
                <DialogTitle
                  className={`${isGottenAchievement ? "text-blue-500" : ""}`}
                >
                  {title}
                </DialogTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{category}</Badge>
                  {isGottenAchievement ? (
                    <Badge className="bg-blue-500">Отримано</Badge>
                  ) : (
                    <Badge variant="destructive">Ще не отримано</Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          <DialogDescription className="mt-4 text-sm">
            {description}
          </DialogDescription>

          <div className="mt-4 space-y-2">
            <p className="font-medium text-sm">
              Щоб отримати досягнення, пройди такі матеріали:
            </p>
            <ul className="list-inside text-sm text-muted-foreground">
              {requiredMaterials.map((materialRef) => {
                const material = materials.find(
                  (m) => m._id === materialRef.id
                );
                return material ? (
                  <li key={material._id}>
                    <MaterialCardSmall material={material} />
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          {(hasAdminAccess || hasInstructorAccess) && (
            <div className="flex gap-1 mt-2">
              <Button className="flex-grow" onClick={() => setIsEditOpen(true)}>
                Редагувати
              </Button>
              <Button className="flex-grow" variant="destructive">
                Видалити
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isEditOpen && (
        <AchievementForm
          initialData={achievement}
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default AchievementDialog;
