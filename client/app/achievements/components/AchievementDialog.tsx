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
import { useMutation } from "@tanstack/react-query";
import { showError, showSuccess } from "@/utils/toast";
import { deleteAchievement } from "../utils/deleteAchievement";

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

  const { mutate: removeAchievementMutation, isPending: isRemoving } =
    useMutation({
      mutationFn: (id: string) => deleteAchievement(id),
      onSuccess: () => {
        showSuccess("Досягнення було успішно видалено");
        window.location.reload();
      },
      onError: (error: Error) => {
        showError(error.message || "Не вдалося видалити досягнення");
      },
    });

  if (!achievement) return null;

  const { title, category, description, requiredMaterials } = achievement;
  const isGottenAchievement = userData?.achievements
    ? userData.achievements.includes(achievement._id)
    : false;

  return (
    <>
      <Dialog open={!!achievement} onOpenChange={onClose}>
        <DialogContent
          className={`${isGottenAchievement ? "ring-2 ring-indigo-500" : ""}`}
        >
          <DialogHeader>
            <div className="flex gap-3">
              <div className="h-[55px]">
                {getAchievementIcon(category, isGottenAchievement)}
              </div>
              <div className="flex flex-col justify-between">
                <DialogTitle
                  className={`${isGottenAchievement ? "text-indigo-500" : ""}`}
                >
                  {title}
                </DialogTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{category}</Badge>
                  {isGottenAchievement ? (
                    <Badge className="bg-indigo-500">Отримано</Badge>
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
              {isGottenAchievement
                ? "Щоб отримати досягнення, потрібно було пройти:"
                : "Щоб отримати досягнення, пройди такі матеріали:"}
            </p>
            <ul className="list-inside text-sm text-muted-foreground flex flex-col gap-4 overflow-auto max-h-[250px]">
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
              <Button
                className="flex-grow"
                onClick={() => setIsEditOpen(true)}
                disabled={isRemoving}
              >
                Редагувати
              </Button>
              <Button
                className="flex-grow"
                variant="destructive"
                onClick={() => removeAchievementMutation(achievement._id)}
                disabled={isRemoving}
              >
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
          onSubmit={onClose}
        />
      )}
    </>
  );
};

export default AchievementDialog;
