import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passed: boolean;
  totalQuestions: number;
  totalCorrect: number;
  totalPoints: number;
  maxPoints: number;
  percentage: number;
}

const ResultDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  passed,
  totalQuestions,
  totalCorrect,
  totalPoints,
  maxPoints,
  percentage,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center text-center">
          {passed ? (
            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500 mb-2" />
          )}
          <DialogTitle className="text-xl font-semibold">
            {passed ? "Вітаємо, ви пройшли тест!" : "На жаль, тест не пройдено"}
          </DialogTitle>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>
              Загальна кількість питань: <strong>{totalQuestions}</strong>
            </p>
            <p>
              Правильних відповідей: <strong>{totalCorrect}</strong>
            </p>
            <p>
              Набрано балів:{" "}
              <strong>
                {totalPoints} / {maxPoints}
              </strong>
            </p>
            <p>
              Відсоток: <strong>{percentage}%</strong>
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
