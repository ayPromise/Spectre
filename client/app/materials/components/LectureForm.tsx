import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { showError, showSuccess } from "@/utils/toast";
import { Specification, Question } from "@shared/types";
import {
  MaterialType,
  MaterialTypeNameUA,
  SpecificationeNameUA,
} from "@shared/types/Enums";
import TestForm from "./TestForm";
import { Input } from "@/components/ui/input";
import { CreateLecturePayload } from "@/types/CreateMaterialPayload";
import { useMaterials } from "@/context/MaterialsContext";
import { UploadCloud } from "lucide-react";
import client_endpoints from "@/app/api/client_endpoints";
import { Lecture } from "@shared/types/Lecture";
import saveMaterial from "../utils/saveMaterial";

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

const specificationOptions = Object.values(Specification);

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
  type: Yup.mixed<Specification>()
    .oneOf(Object.values(Specification), "Невірний тип")
    .required("Тип обовʼязковий"),
});

type LectureFormProps = {
  initialData?: Lecture;
};

const LectureForm: React.FC<LectureFormProps> = ({ initialData }) => {
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
  const { mutate: createMaterialMutation, isPending } = useMutation({
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
        ? ({ name: initialData.videoURL, type: "video/mp4" } as File)
        : null,
      type: initialData?.type ?? specificationOptions[0],
      context: { initialData },
    },
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
        const { video, ...restValues } = values;

        const formData = new FormData();
        formData.append("video", video as File);

        let uploadedVideoUrl = initialData?.videoURL || "";
        if (!uploadedVideoUrl) {
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
        />

        <div>
          <Label htmlFor="type" className="block mb-3 font-medium">
            Тип лекції
          </Label>
          <Select
            name="type"
            value={values.type}
            onValueChange={(value) => setFieldValue("type", value)}
          >
            <SelectTrigger
              className={`w-full border p-2 rounded-md ${
                touched.type && errors.type
                  ? "border-red-600"
                  : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Оберіть тип..." />
            </SelectTrigger>
            <SelectContent>
              {specificationOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {SpecificationeNameUA[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {touched.type && errors.type && (
            <p className="text-red-600 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="block mb-3 font-medium">
            Опис
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Введіть короткий опис лекції..."
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`block w-full rounded-md border p-2 ${
              touched.description && errors.description
                ? "border-red-600"
                : "border-gray-300"
            }`}
          />
          {touched.description && errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

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
            <p className="text-red-600 text-sm mt-1">{errors.video}</p>
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
        disabled={(isSubmitting && !isValid) || isPending}
      >
        {isEditingMode ? "Оновити" : "Створити"}
      </Button>
    </>
  );
};

export default LectureForm;
