import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  isFirstQuestion: boolean;
  totalQuestions: number;
  currentQuestionIndex: number;
  selectedAnswers: string[];
  isAnsweredAll: boolean;
  submitted: boolean;
  goToQuestion: (index: number) => void;
  handleSubmit: () => void;
  resetTest: () => void;
}

const NavigationControls: React.FC<Props> = ({
  isFirstQuestion,
  totalQuestions,
  currentQuestionIndex,
  selectedAnswers,
  isAnsweredAll,
  submitted,
  goToQuestion,
  handleSubmit,
  resetTest,
}) => {
  return (
    <div className="flex justify-between items-center">
      <Button
        variant="ghost"
        disabled={isFirstQuestion}
        onClick={() => goToQuestion(currentQuestionIndex - 1)}
      >
        <ArrowLeft className="mr-1" /> Попереднє
      </Button>
      <div className="flex space-x-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
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
      {isAnsweredAll ? (
        submitted ? (
          <Button onClick={resetTest}>Пройти знову</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={submitted}>
            Надіслати
          </Button>
        )
      ) : (
        <Button
          variant="ghost"
          disabled={selectedAnswers.length === 0}
          onClick={() => goToQuestion(currentQuestionIndex + 1)}
        >
          Наступне <ArrowRight className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;
