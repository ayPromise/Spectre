"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

// COMPONENTS
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// UTILS
import { showSuccess, showError } from "@/utils/toast";

// TYPES
import { LessonType, MeetingType } from "@shared/types/Enums";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSchedule } from "@/context/ScheduleContext";
import createSchedule from "../utils/createSchedule";
import updateSchedule from "../utils/updateSchedule";
import { Schedule } from "@shared/types";

interface ScheduleDialogProps {
  date?: {
    year: number;
    month: number;
    day: number;
  };
  initialValues?: {
    _id: string;
    title: string;
    time: string;
    lessonType: LessonType;
    meetingType: MeetingType;
    note?: string;
    date: Date;
  };
  isEditing?: boolean;
}

const ScheduleDialog = ({
  date,
  initialValues,
  isEditing = false,
}: ScheduleDialogProps) => {
  const { refetchSchedules } = useSchedule();
  const { mutate: createScheduleMutate, isPending: isScheduleCreating } =
    useMutation({
      mutationFn: createSchedule,
      onSuccess: () => {
        showSuccess("Заняття було успішно додано в розклад");
        refetchSchedules();
      },
      onError: (error: Error) => {
        showError(error.message || "Помилка при створенні розкладу");
      },
    });

  const { mutate: updateScheduleMutate, isPending: isScheduleUpdating } =
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Schedule> }) =>
        updateSchedule(id, data),
      onSuccess: () => {
        showSuccess("Заняття було успішно оновлено");
        refetchSchedules();
      },
      onError: (error: Error) => {
        showError(error.message || "Помилка при оновленні розкладу");
      },
    });

  const formik = useFormik({
    initialValues: initialValues
      ? {
          title: initialValues.title,
          time: initialValues.time,
          lessonType: initialValues.lessonType,
          meetingType: initialValues.meetingType,
          note: initialValues.note,
        }
      : {
          title: "",
          time: "10:00",
          lessonType: LessonType.Lecture,
          meetingType: MeetingType.Offline,
          note: "",
        },
    validationSchema: Yup.object({
      title: Yup.string().required("Введіть назву"),
      time: Yup.string().required("Оберіть час"),
      lessonType: Yup.mixed<LessonType>().required(),
      meetingType: Yup.mixed<MeetingType>().required(),
      note: Yup.string().max(500, "Занадто довга нотатка"),
    }),
    onSubmit: (values) => {
      if (isEditing && initialValues) {
        const { time, ...rest } = values;
        updateScheduleMutate({ id: initialValues._id, data: rest });
      } else if (date) {
        const fullDate = new Date(
          date.year,
          date.month,
          date.day,
          parseInt(values.time.split(":")[0], 10),
          parseInt(values.time.split(":")[1], 10)
        );

        const { time, ...rest } = values;
        createScheduleMutate({ ...rest, date: fullDate });
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = formik;

  useEffect(() => {
    if (
      values.lessonType === LessonType.Flight ||
      values.lessonType === LessonType.Mixed
    ) {
      setFieldValue("meetingType", MeetingType.Offline);
    }
  }, [values.lessonType, setFieldValue]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center h-full w-full group transition hover:bg-gray-100 cursor-pointer">
          {isEditing ? (
            <Button variant="outline" className="w-full">
              Редагувати заняття
            </Button>
          ) : (
            <Plus
              className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors"
              strokeWidth={2}
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Редагування заняття" : "Створення заняття"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            id="title"
            name="title"
            label="Назва заняття"
            placeholder="Набуття навичок..."
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
          />

          <div className="flex gap-4">
            <div className="flex-1 min-w-[30%]">
              <Label
                htmlFor="lessonType"
                className="text-sm font-medium mb-1 block"
              >
                Тип заняття
              </Label>
              <Select
                value={values.lessonType}
                onValueChange={(val) => setFieldValue("lessonType", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть тип заняття" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={LessonType.Lecture}>Лекція</SelectItem>
                  <SelectItem value={LessonType.Flight}>Політ</SelectItem>
                  <SelectItem value={LessonType.Mixed}>Змішане</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[30%]">
              {values.lessonType === LessonType.Lecture ? (
                <>
                  <Label
                    htmlFor="meetingType"
                    className="text-sm font-medium mb-1 block"
                  >
                    Формат
                  </Label>
                  <Select
                    value={values.meetingType}
                    onValueChange={(val) => setFieldValue("meetingType", val)}
                    name="meetingType"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Оберіть формат" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={MeetingType.Offline}>
                        Офлайн
                      </SelectItem>
                      <SelectItem value={MeetingType.Online}>Онлайн</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <div className="text-sm text-muted-foreground pt-7">
                  Формат: Офлайн
                </div>
              )}
            </div>
            <div className="flex-1 min-w-[30%]">
              <FormInput
                id="time"
                name="time"
                type="time"
                label="Час проведення"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.time && errors.time}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="note" className="block mb-3 font-medium">
              Додаткова інформація
            </Label>
            <Textarea
              id="note"
              name="note"
              rows={5}
              placeholder="Не забудьте взяти..."
              value={values.note}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.note && errors.note && (
              <p className="text-red-600 text-sm mt-1">{errors.note}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isScheduleCreating || isScheduleUpdating}
          >
            {isEditing ? "Зберегти зміни" : "Повідомити про заняття"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
