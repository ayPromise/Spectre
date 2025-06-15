"use client";

import { useState } from "react";
import { Check, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { showError, showSuccess } from "@/utils/toast";
import updateToken from "@/lib/update-token";
import completeMaterial from "../utils/completeMaterial";
import { MaterialType } from "@shared/types";
import isMaterialFinished from "../utils/isMaterialFinished";
import { tryAssignAchievements } from "@/lib/tryAssignAchievements";

type Props = {
  videoId: string;
  type: MaterialType;
};

const CompleteButton = ({ type, videoId }: Props) => {
  const { userData, setUserData } = useAuth();
  const isFinished = isMaterialFinished(userData, type, videoId);
  const [isChecked, setIsChecked] = useState(isFinished);
  const mutation = useMutation({
    mutationFn: () => completeMaterial(type, videoId, userData?._id),
    onSuccess: async (data) => {
      setIsChecked(true);
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

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={isChecked || mutation.isPending}
    >
      {isChecked ? <Check size={16} /> : <Square size={16} />}
      Завершено
    </Button>
  );
};

export default CompleteButton;
