import React, { useEffect } from "react";
import { Option, Question } from "@shared/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  isCorrectAnswerMissing,
  isInputInvalid,
  isPointsInvalid,
} from "../utils/validation";

interface TestFormProps {
  questions: Question[];
  onQuestionsChange: (newQuestions: Question[]) => void;
  showValidationErrors?: boolean;
  setValidationPassed?: () => void;
}

const TestForm: React.FC<TestFormProps> = ({
  questions,
  onQuestionsChange,
  showValidationErrors,
  setValidationPassed,
}) => {
  const addQuestion = () => {
    const newOptions: Option[] = [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ];
    onQuestionsChange([
      ...questions,
      { text: "", options: newOptions, multipleAnswers: false, points: 1 },
    ]);
  };

  const updateQuestionText = (index: number, text: string) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], text };
    onQuestionsChange(updated);
  };

  const updateQuestionPoints = (index: number, points: number) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], points };
    onQuestionsChange(updated);
  };

  const toggleMultipleAnswers = (index: number, multiple: boolean) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], multipleAnswers: multiple };

    if (!multiple) {
      const options = updated[index].options || [];
      let foundOne = false;
      updated[index].options = options.map((opt) => {
        if (opt.isCorrect && !foundOne) {
          foundOne = true;
          return opt;
        }
        return { ...opt, isCorrect: false };
      });
    }

    onQuestionsChange(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    const question = updated[qIndex];
    const newOptions = [
      ...(question.options || []),
      { text: "", isCorrect: false },
    ];
    updated[qIndex] = { ...question, options: newOptions };
    onQuestionsChange(updated);
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
    const updated = [...questions];
    const newOptions = [...(questions[qIndex].options || [])];
    newOptions[oIndex] = { ...newOptions[oIndex], text };
    updated[qIndex] = { ...questions[qIndex], options: newOptions };
    onQuestionsChange(updated);
  };

  const toggleOptionCorrect = (qIndex: number, oIndex: number) => {
    const updated = [...questions];
    const question = updated[qIndex];
    const multiple = question.multipleAnswers;
    const newOptions = [...(question.options || [])];

    if (multiple) {
      newOptions[oIndex] = {
        ...newOptions[oIndex],
        isCorrect: !newOptions[oIndex].isCorrect,
      };
    } else {
      newOptions.forEach((opt, idx) => {
        newOptions[idx] = { ...opt, isCorrect: idx === oIndex };
      });
    }

    updated[qIndex] = { ...question, options: newOptions };
    onQuestionsChange(updated);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const options = questions[qIndex].options || [];
    if (options.length <= 2) return; // не дозволяємо менше 2
    const updated = [...questions];
    const newOptions = [...options];
    newOptions.splice(oIndex, 1);
    updated[qIndex] = { ...questions[qIndex], options: newOptions };
    onQuestionsChange(updated);
  };

  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    onQuestionsChange(updated);
  };

  useEffect(() => {
    if (!setValidationPassed) return;

    const allValid = questions.every((question) => {
      if (isInputInvalid(question.text)) return false;
      if (isPointsInvalid(question.points)) return false;

      question.options.some((option) => {
        if (isInputInvalid(option.text)) return false;
      });

      if (question.options?.some((opt) => isInputInvalid(opt.text)))
        return false;

      if (isCorrectAnswerMissing(question.options)) return false;

      return true;
    });

    if (allValid) {
      setValidationPassed();
    }
  }, [questions, setValidationPassed]);

  return (
    <div className="mt-[40px]">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Тестування</h2>
      </div>

      {questions.map((question, qIndex) => (
        <div
          key={qIndex}
          className="mb-6 border rounded p-4 bg-gray-50 relative"
        >
          <div className="flex items-center mb-2">
            <div
              onClick={() => removeQuestion(qIndex)}
              role="button"
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer mr-2"
              title="Видалити питання"
            >
              <X size={18} />
            </div>
            <Label
              htmlFor={`question-${qIndex}`}
              className="block font-medium text-lg"
            >
              Питання {qIndex + 1}
            </Label>
          </div>

          <div className="flex items-center space-x-4 mb-2 justify-center">
            <Input
              id={`question-${qIndex}`}
              value={question.text}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
              placeholder="Текст питання"
              className={`flex-grow ${
                showValidationErrors && isInputInvalid(question.text)
                  ? "border border-red-500"
                  : ""
              }`}
            />
            <div className="w-24 relative">
              <Label
                htmlFor={`points-${qIndex}`}
                className="absolute -top-6 left-0.5 text-sm"
              >
                Бали
              </Label>
              <Input
                id={`points-${qIndex}`}
                type="number"
                min={1}
                value={question.points ?? 1}
                onChange={(e) =>
                  updateQuestionPoints(qIndex, Number(e.target.value))
                }
                className={
                  showValidationErrors && isPointsInvalid(question.points)
                    ? "border border-red-500"
                    : ""
                }
              />
            </div>
          </div>

          <RadioGroup
            value={question.multipleAnswers ? "multiple" : "single"}
            onValueChange={(val) =>
              toggleMultipleAnswers(qIndex, val === "multiple")
            }
            className="flex space-x-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id={`single-${qIndex}`} />
              <Label htmlFor={`single-${qIndex}`}>
                Одна правильна відповідь
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id={`multiple-${qIndex}`} />
              <Label htmlFor={`multiple-${qIndex}`}>
                Декілька правильних відповідей
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4 pl-4 border-l-2 border-gray-300">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Варіанти відповіді</h3>
              <Button
                onClick={() => addOption(qIndex)}
                className="px-2 py-0 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors cursor-pointer"
              >
                Додати варіант
              </Button>
            </div>

            {question.options?.map((option, oIndex) => (
              <div key={oIndex} className="mb-2 flex items-center space-x-2">
                <div
                  onClick={() => removeOption(qIndex, oIndex)}
                  role="button"
                  className={`text-red-500 hover:text-red-700 transition-colors cursor-pointer ${
                    question.options.length <= 2
                      ? "opacity-30 pointer-events-none"
                      : ""
                  }`}
                  title="Видалити варіант"
                >
                  <X size={16} />
                </div>

                <Input
                  value={option.text}
                  onChange={(e) =>
                    updateOptionText(qIndex, oIndex, e.target.value)
                  }
                  placeholder="Текст варіанту відповіді"
                  className={`flex-grow ${
                    showValidationErrors && isInputInvalid(option.text)
                      ? "border border-red-500"
                      : ""
                  }`}
                />

                {question.multipleAnswers ? (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={option.isCorrect}
                      onCheckedChange={() =>
                        toggleOptionCorrect(qIndex, oIndex)
                      }
                      id={`check-${qIndex}-${oIndex}`}
                      className={`flex items-center space-x-2 ${
                        showValidationErrors &&
                        isCorrectAnswerMissing(question.options)
                          ? "border border-red-500 p-1 rounded"
                          : ""
                      }`}
                    />
                    <Label
                      htmlFor={`check-${qIndex}-${oIndex}`}
                      className="text-sm"
                    >
                      Правильний
                    </Label>
                  </div>
                ) : (
                  <RadioGroup
                    value={question.options
                      .findIndex((opt) => opt.isCorrect)
                      ?.toString()}
                    onValueChange={(val) =>
                      toggleOptionCorrect(qIndex, Number(val))
                    }
                    className={`${
                      showValidationErrors &&
                      isCorrectAnswerMissing(question.options)
                        ? "border border-red-500 p-1 rounded"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={oIndex.toString()}
                        id={`radio-${qIndex}-${oIndex}`}
                        className={`${
                          showValidationErrors &&
                          isCorrectAnswerMissing(question.options)
                            ? "border border-red-500 p-1 rounded"
                            : ""
                        }`}
                      />
                      <Label
                        htmlFor={`radio-${qIndex}-${oIndex}`}
                        className="text-sm"
                      >
                        Правильний
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={addQuestion}
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Додати питання
      </Button>
    </div>
  );
};

export default TestForm;
