import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Test } from "@shared/types";

interface Props {
  test: Test;
}

const TestView: React.FC<Props> = ({ test }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = test.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);
  };

  const isAnsweredAll = Object.values(answers).length === test.questions.length;
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const selectedAnswer = answers[currentQuestion._id ?? ""];

  const goToQuestion = (index: number) => setCurrentQuestionIndex(index);

  // --- Result Calculation ---
  const totalQuestions = test.questions.length;

  const correctAnswers = test.questions.filter((q) => {
    const selected = answers[q._id ?? ""];
    const correctOption = q.options.find((o) => o.isCorrect);
    return selected === correctOption?._id;
  });

  const totalCorrect = correctAnswers.length;
  const totalPoints = correctAnswers.reduce((sum, q) => sum + q.points, 0);
  const maxPoints = test.questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  const passed = percentage > 50;

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Перевірка на засвоєння інформації
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <RadioGroup
              disabled={submitted}
              value={selectedAnswer}
              onValueChange={(value) =>
                handleAnswerSelect(currentQuestion._id ?? "", value)
              }
            >
              {currentQuestion.options.map((option) => (
                <div key={option._id} className="w-full">
                  <RadioGroupItem
                    className="sr-only"
                    value={option._id as string}
                    id={option._id}
                    disabled={submitted}
                  />
                  <Label
                    htmlFor={option._id}
                    className={`block w-full cursor-pointer rounded-lg border px-4 py-3 text-left transition-colors duration-200 ${
                      selectedAnswer === option._id
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
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            disabled={isFirstQuestion}
            onClick={() => setCurrentQuestionIndex((i) => i - 1)}
          >
            <ArrowLeft className="mr-1" /> Попереднє
          </Button>

          <div className="flex space-x-2">
            {test.questions.map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={idx === currentQuestionIndex ? "default" : "outline"}
                onClick={() => goToQuestion(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>

          {isLastQuestion ? (
            submitted ? (
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setAnswers({});
                  setCurrentQuestionIndex(0);
                  setShowResult(false);
                }}
              >
                Пройти знову
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer || submitted || !isAnsweredAll}
              >
                Надіслати
              </Button>
            )
          ) : (
            <Button
              variant="ghost"
              disabled={!selectedAnswer}
              onClick={() => setCurrentQuestionIndex((i) => i + 1)}
            >
              Наступне <ArrowRight className="ml-1" />
            </Button>
          )}
        </div>
      </div>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center text-center">
            {passed ? (
              <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500 mb-2" />
            )}
            <DialogTitle className="text-xl font-semibold">
              {passed
                ? "Вітаємо, ви пройшли тест!"
                : "На жаль, тест не пройдено"}
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
    </>
  );
};

export default TestView;
