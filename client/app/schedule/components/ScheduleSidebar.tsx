"use client";
import React from "react";
import { Schedule } from "@shared/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MeetingTypeNameUA } from "@shared/types/Enums";
import { Button } from "@/components/ui/button";
import { LogOut, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { useAccess } from "@/hooks/useAccess";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import signUpToSchedule from "../utils/signUpToSchedule";
import { showError, showSuccess } from "@/utils/toast";
import { useSchedule } from "@/context/ScheduleContext";
import unsubscribeFromSchedule from "../utils/unsubscribeFromSchedule";

interface ScheduleSidebarProps {
  schedule: Schedule | null;
  onClose: () => void;
}

const ScheduleSidebar: React.FC<ScheduleSidebarProps> = ({
  schedule,
  onClose,
}) => {
  const { hasAdminAccess, hasInstructorAccess } = useAccess();
  const { userData } = useAuth();
  const { refetchSchedules } = useSchedule();
  const isUserAlreadySignedUp =
    userData && schedule?.assignedUsers.includes(userData?.sub);

  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: () => signUpToSchedule(schedule!._id, userData!.sub),
    onSuccess: () => {
      showSuccess("Будемо вас чекати на занятті 😉");
      refetchSchedules();
      onClose();
    },
    onError: (error: Error) => {
      showError(error.message || "Не вдалося записатися");
    },
  });

  const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation({
    mutationFn: () => unsubscribeFromSchedule(schedule!._id, userData!.sub),
    onSuccess: () => {
      showSuccess("З вами було б набагато краще 😢");
      refetchSchedules();
      onClose();
    },
    onError: (error: Error) => {
      showError(error.message || "Не вдалося відписатися");
    },
  });

  const onUnsubscribe = () => {
    if (!schedule || !userData?.sub) return;
    unsubscribe();
  };

  const onSignUp = () => {
    if (!schedule || !userData?.sub) return;
    signUp();
  };

  const onEdit = () => {};

  const onDelete = () => {};
  return (
    <Sheet open={!!schedule} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-96 flex flex-col py-6 px-8">
        {schedule && (
          <>
            <SheetHeader>
              <SheetTitle className="text-2xl">{schedule.title}</SheetTitle>
              <SheetDescription>
                Детальна інформація про заняття
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 text-sm flex-1">
              <div>
                <p className="text-muted-foreground">Тип зустрічі</p>
                <p className="font-medium">
                  {MeetingTypeNameUA[schedule.meetingType]}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Дата</p>
                <p className="font-medium">
                  {new Date(schedule.date).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Нотатки</p>
                <p className="font-medium">
                  {schedule.note || "Немає нотаток"}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col gap-2">
                {!hasAdminAccess &&
                  !hasInstructorAccess &&
                  (isUserAlreadySignedUp ? (
                    <Button
                      onClick={onUnsubscribe}
                      className="w-full"
                      variant="destructive"
                      disabled={isUnsubscribing}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Мене не буде на занятті
                    </Button>
                  ) : (
                    <Button
                      onClick={onSignUp}
                      className="w-full"
                      disabled={isSigningUp}
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Записатися
                    </Button>
                  ))}

                {(hasAdminAccess || hasInstructorAccess) && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={onEdit}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Редагувати
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={onDelete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Видалити
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleSidebar;
