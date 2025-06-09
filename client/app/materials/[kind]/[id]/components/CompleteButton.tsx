"use client";

import { useState } from "react";
import { Check, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import completeVideo from "../utils/completeVideo";
import { useAuth } from "@/context/AuthContext";
import { showError, showSuccess } from "@/utils/toast";

type Props = {
  videoId: string;
};

const CompleteButton = ({ videoId }: Props) => {
  const { userData, setUserData } = useAuth();
  const isFinished = userData?.completedVideos.includes(videoId);
  const [isChecked, setIsChecked] = useState(isFinished);
  const mutation = useMutation({
    mutationFn: () => completeVideo(videoId, userData?.sub),
    onSuccess: () => {
      setIsChecked(true);
      if (userData && !userData.completedVideos.includes(videoId)) {
        setUserData({
          ...userData,
          completedVideos: [...userData.completedVideos, videoId],
        });

        console.log({
          ...userData,
          completedVideos: [...userData.completedVideos, videoId],
        });

        showSuccess("Гарна робота!");
      }
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
