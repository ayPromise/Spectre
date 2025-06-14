import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Label } from "@/components/ui/label";

import { showError, showSuccess } from "@/utils/toast";
import { Question } from "@shared/types";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import TestForm from "./TestForm";
import { Input } from "@/components/ui/input";
import { CreateLecturePayload } from "@/types/CreateMaterialPayload";
import { useMaterials } from "@/context/MaterialsContext";
import { UploadCloud } from "lucide-react";
import client_endpoints from "@/app/api/client_endpoints";
import { Lecture } from "@shared/types/Lecture";
import saveMaterial from "../utils/saveMaterial";
import FormTextarea from "@/components/custom/FormTextarea";

const defaultTest = [
  {
    text: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    points: 1,
    multipleAnswers: false,
  },
];

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Заголовок обовʼязковий"),
  description: Yup.string().trim().required("Опис обовʼязковий"),
  video: Yup.mixed()
    .test("required-video", "Відео обов'язкове", function (value) {
      if (this.options?.context?.initialData?.videoURL) {
        return true;
      }
      return value != null;
    })
    .test(
      "fileType",
      "Потрібно відео",
      (value) => !value || (value && value.type.startsWith("video/"))
    ),
  course: Yup.string().trim().required("Тип обовʼязковий"),
});

type LectureFormProps = {
  initialData?: Lecture;
  selectedCourse?: string;
};

const LectureForm: React.FC<LectureFormProps> = ({
  initialData,
  selectedCourse,
}) => {
  const isEditingMode = !!initialData;

  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(
    initialData?.test.questions ?? defaultTest
  );
  const [isValid, setIsValid] = useState(false);

  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };

  const { refetch } = useMaterials();

  const {
    mutate: createMaterialMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: CreateLecturePayload) =>
      saveMaterial(data, isEditingMode ? initialData._id : undefined),
    onSuccess: (lecture) => {
      const kind = lecture.kind.toLocaleLowerCase();
      const id = lecture._id;
      showSuccess(
        `${MaterialTypeNameUA[MaterialType.Lecture]} була успішно ${
          isEditingMode ? "оновлена" : "створена"
        } 🎉`
      );
      refetch();
      router.push(`/materials/${kind}/${id}`);
    },
    onError: (error: Error) => {
      showError(
        error.message ||
          `Не вдалося ${isEditingMode ? "оновити" : "створити"} матеріал`
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      video: initialData?.videoURL
        ? ({
            name: initialData.videoURL,
            type: "video/mp4",
            mocked: true,
          } as any)
        : null,
      course: initialData?.course ?? selectedCourse ?? "",
      context: { initialData },
    },
    enableReinitialize: true,

    validationSchema,
    onSubmit: async (values) => {
      if (!questions.length) {
        showError("Додайте тест до лекції");
        return;
      }

      if (!isValid) return;

      if (!questions.length) {
        showError("Обов'зяково додайте тест по навчальному матеріалу");
        return;
      }

      if (isValid) {
        const { video, context, ...restValues } = values;

        const formData = new FormData();
        formData.append("video", video as File);
        const isNewVideoFile = video && !(video as any).mocked;

        let uploadedVideoUrl = initialData?.videoURL || "";

        if (isNewVideoFile) {
          try {
            const res = await fetch(client_endpoints.upload, {
              method: "POST",
              body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            uploadedVideoUrl = data.url;
          } catch (error: any) {
            showError(error.message);
            return;
          }
        }

        createMaterialMutation({
          ...restValues,
          test: {
            questions,
            summaryScore: questions.reduce(
              (total, question) => total + question.points,
              0
            ),
          },
          kind: MaterialType.Lecture,
          videoURL: uploadedVideoUrl,
          time: 100,
        });
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = formik;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" id="lectureForm">
        <FormInput
          id="title"
          label="Заголовок"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && errors.title}
          required
          disabled={((isSubmitting && !isValid) || isPending) && !isError}
        />

        <FormTextarea
          id="description"
          name="description"
          placeholder="Введіть короткий опис лекції..."
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          label="Опис"
          error={touched.description && errors.description}
          disabled={((isSubmitting && !isValid) || isPending) && !isError}
        />

        <div>
          <Label htmlFor="video" className="block mb-3 font-medium">
            Відео
          </Label>
          <Label
            htmlFor="video"
            className={`flex items-center justify-between px-4 py-2 rounded-md border cursor-pointer transition `}
          >
            <span>
              {values.video?.name ||
                initialData?.videoURL ||
                "Оберіть відео файл"}
            </span>
            <UploadCloud className="w-5 h-5 ml-2" />
          </Label>

          <Input
            id="video"
            name="video"
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              setFieldValue("video", file);
            }}
            className="hidden"
          />
          {touched.video && errors.video && (
            <p className="text-red-600 text-sm mt-1">
              {errors.video.toLocaleString()}
            </p>
          )}
        </div>
      </form>

      <TestForm
        questions={questions}
        onQuestionsChange={handleQuestionsChange}
        setValidationPassed={() => setIsValid(true)}
        isSubmitting={isSubmitting}
      />

      <Button
        type="submit"
        form="lectureForm"
        className="w-full mt-5 font-bold text-lg"
        disabled={((isSubmitting && !isValid) || isPending) && !isError}
      >
        {isEditingMode ? "Оновити" : "Створити"}
      </Button>
    </>
  );
};

export default LectureForm;
