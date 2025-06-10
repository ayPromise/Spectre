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
  if (!achievement) return null;

  const { title, category, description, requiredMaterials } = achievement;
  const isGottenAchievement = userData?.achievements
    ? userData.achievements.includes(achievement._id)
    : false;

  return (
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
                  <Badge className="bg-blue-500 ">Отримано</Badge>
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
              const material = materials.find((m) => m._id === materialRef.id);
              return material ? (
                <li key={material._id}>
                  <MaterialCardSmall material={material} />
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementDialog;
