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
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { useAccess } from "@/hooks/useAccess";
import { useAuth } from "@/context/AuthContext";

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
  const isUserAlreadySignedUp =
    userData && schedule?.assignedUsers.includes(userData?.sub);
  const onSignUp = () => {};

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
                {!isUserAlreadySignedUp &&
                  !hasAdminAccess &&
                  !hasInstructorAccess && (
                    <Button onClick={onSignUp} className="w-full">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Записатися
                    </Button>
                  )}

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
