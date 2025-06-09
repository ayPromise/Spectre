import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@shared/types";

interface Props {
  question: Question;
  isMultiple: boolean;
  selectedAnswers: string[];
  submitted: boolean;
  onAnswerChange: (
    questionId: string,
    optionId: string,
    checked?: boolean
  ) => void;
}

const QuestionDisplay: React.FC<Props> = ({
  question,
  isMultiple,
  selectedAnswers,
  submitted,
  onAnswerChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="mb-2 text-sm text-muted-foreground italic">
          {isMultiple
            ? `Виберіть ${
                question.options.filter((o) => o.isCorrect).length
              } або більше відповідей`
            : "Виберіть одну відповідь"}
        </p>
        {isMultiple ? (
          question.options.map((option) => (
            <div
              key={option._id}
              className="w-full flex items-center space-x-2"
            >
              <Checkbox
                id={option._id}
                checked={selectedAnswers.includes(option._id as string)}
                disabled={submitted}
                onCheckedChange={(checked) =>
                  onAnswerChange(
                    question._id ?? "",
                    option._id as string,
                    Boolean(checked)
                  )
                }
                className="shrink-0"
              />
              <Label
                htmlFor={option._id}
                className={`block cursor-pointer rounded-lg border px-4 py-3 text-left flex-1 transition-colors duration-200 ${
                  selectedAnswers.includes(option._id as string)
                    ? "bg-slate-100 border-slate-500 text-slate-900"
                    : !submitted &&
                      "hover:bg-muted hover:border-muted-foreground"
                } ${submitted ? "cursor-default opacity-80" : ""}`}
              >
                {option.text}
              </Label>
            </div>
          ))
        ) : (
          <RadioGroup
            value={selectedAnswers[0] ?? ""}
            onValueChange={(val) => onAnswerChange(question._id ?? "", val)}
            disabled={submitted}
            className="space-y-2"
          >
            {question.options.map((option) => (
              <div
                key={option._id}
                className="w-full flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={option._id as string}
                  id={option._id}
                  className="shrink-0"
                />
                <Label
                  htmlFor={option._id}
                  className={`block cursor-pointer rounded-lg border px-4 py-3 text-left flex-1 transition-colors duration-200 ${
                    selectedAnswers.includes(option._id as string)
                      ? "bg-slate-100 border-slate-500 text-slate-900"
                      : !submitted &&
                        "hover:bg-muted hover:border-muted-foreground"
                  } ${submitted ? "cursor-default opacity-80" : ""}`}
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;
