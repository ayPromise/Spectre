import React, { useEffect, useRef, useState } from "react";

// COMPONENTS
import QuestionDisplay from "./QuestionDisplay";
import NavigationControls from "./NavigationControls";
import ResultDialog from "./ResultDialog";

// UTILS
import completeMaterial from "../utils/completeMaterial";
import { showError, showSuccess } from "@/utils/toast";
import updateToken from "@/lib/update-token";

// TYPES
import { MaterialUnion, Test } from "@shared/types";

// HOOKS
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { tryAssignAchievements } from "@/lib/tryAssignAchievements";

interface Props {
  test: Test;
  material: MaterialUnion;
}

const TestView: React.FC<Props> = ({ material, test }) => {
  const [answers, setAnswers] = useState<{
    [questionId: string]: string[] | string;
  }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [didMount, setDidMount] = useState(false);
  const { userData, setUserData } = useAuth();

  const currentQuestion = test.questions[currentQuestionIndex];
  const isMultiple =
    currentQuestion.options.filter((o) => o.isCorrect).length > 1;

  const handleAnswerChange = (
    questionId: string,
    optionId: string,
    checked?: boolean
  ) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const prevSelected = (prev[questionId] as string[]) ?? [];
        if (checked) {
          return { ...prev, [questionId]: [...prevSelected, optionId] };
        } else {
          return {
            ...prev,
            [questionId]: prevSelected.filter((id) => id !== optionId),
          };
        }
      } else {
        return { ...prev, [questionId]: optionId };
      }
    });
  };

  const mutation = useMutation({
    mutationFn: () =>
      completeMaterial(material.kind, material._id, userData?.sub),
    onSuccess: async (data) => {
      const token = data.access_token;
      const { user } = await updateToken(token);
      setUserData(user);
      await tryAssignAchievements(user, setUserData);
      showSuccess("Гарна робота!");
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResult(true);

    if (passed) {
      mutation.mutate();
    }
  };

  const isAnsweredAll = test.questions.every((q) => {
    const ans = answers[q._id ?? ""];
    return Array.isArray(ans) ? ans.length > 0 : !!ans;
  });

  const selectedAnswers = (() => {
    const ans = answers[currentQuestion._id ?? ""];
    return Array.isArray(ans) ? ans : ans ? [ans] : [];
  })();

  const goToQuestion = (index: number) => setCurrentQuestionIndex(index);

  const totalQuestions = test.questions.length;
  const isFirstQuestion = currentQuestionIndex === 0;

  const correctAnswers = test.questions.filter((q) => {
    const selected = answers[q._id ?? ""];
    const selectedArr = Array.isArray(selected)
      ? selected
      : selected
      ? [selected]
      : [];
    const correctOptionIds = q.options
      .filter((o) => o.isCorrect)
      .map((o) => o._id);
    const selectedSet = new Set(selectedArr);
    return (
      correctOptionIds.every((id) => selectedSet.has(id as string)) &&
      selectedArr.every((id) => correctOptionIds.includes(id))
    );
  });

  const totalCorrect = correctAnswers.length;
  const totalPoints = correctAnswers.reduce((sum, q) => sum + q.points, 0);
  const maxPoints = test.summaryScore;
  const percentage = Math.round((totalPoints / maxPoints) * 100);
  const passed = percentage > 50;

  useEffect(() => {
    if (didMount) {
      scrollRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
    } else {
      setDidMount(true);
    }
  }, [currentQuestionIndex]);

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Перевірка на засвоєння інформації
        </h2>
        <QuestionDisplay
          question={currentQuestion}
          isMultiple={isMultiple}
          selectedAnswers={selectedAnswers}
          submitted={submitted}
          onAnswerChange={handleAnswerChange}
        />
        <NavigationControls
          isFirstQuestion={isFirstQuestion}
          totalQuestions={totalQuestions}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          isAnsweredAll={isAnsweredAll}
          submitted={submitted}
          goToQuestion={goToQuestion}
          handleSubmit={handleSubmit}
          resetTest={() => {
            setSubmitted(false);
            setAnswers({});
            setCurrentQuestionIndex(0);
            setShowResult(false);
          }}
        />
      </div>
      <ResultDialog
        open={showResult}
        onOpenChange={setShowResult}
        passed={passed}
        totalQuestions={totalQuestions}
        totalCorrect={totalCorrect}
        totalPoints={totalPoints}
        maxPoints={maxPoints}
        percentage={percentage}
      />
      <div ref={scrollRef} />
    </>
  );
};

export default TestView;
