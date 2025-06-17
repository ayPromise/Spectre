import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Label } from "@/components/ui/label";
import { Article, Question } from "@shared/types";
import { MaterialType, MaterialTypeNameUA } from "@shared/types/Enums";
import TestForm from "./TestForm";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateArticlePayload } from "@/types/CreateMaterialPayload";
import { useMaterials } from "@/context/MaterialsContext";
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";
import saveMaterial from "../utils/saveMaterial";

type ArticleFormData = {
  title: string;
  content: string;
  course: string;
  testId?: string;
};

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Заголовок обовʼязковий"),
  content: Yup.string().trim().required("Контент обовʼязковий"),
  course: Yup.string().trim().required("Тип обовʼязковий"),
  testId: Yup.string().optional(),
});

const defaultTest = [
  {
    text: "",
    options: [
      {
        text: "",
        isCorrect: false,
      },
      {
        text: "",
        isCorrect: false,
      },
    ],
    points: 1,
    multipleAnswers: false,
  },
];

type ArticleFormProps = {
  initialData?: Article;
  selectedCourse?: string;
};

const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  selectedCourse,
}) => {
  const isEditingMode = !!initialData;

  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>(
    initialData?.test?.questions ?? defaultTest
  );
  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };
  const [isValid, setIsValid] = useState(false);
  const { refetch } = useMaterials();

  const {
    mutate: createMaterialMutation,
    isPending: isCreating,
    isError,
  } = useMutation({
    mutationFn: (data: CreateArticlePayload) =>
      saveMaterial(data, isEditingMode ? initialData!._id : undefined),
    onSuccess: (article) => {
      const kind = article.kind.toLocaleLowerCase();
      const id = article._id;
      showSuccess(
        `${MaterialTypeNameUA[MaterialType.Article]} була успішно ${
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
  const formik = useFormik<ArticleFormData>({
    initialValues: {
      title: initialData?.title ?? "",
      content:
        initialData?.content ??
        `<h1>Навчальна робота:</h1>
                    <p></p>
                    <h2>Мета розділу:</h2>
                    <p></p>
                    <h2>Основні поняття:</h2>
                    <p></p>
                    <h2>Огляд структури алгоритму:</h2>
                    <p></p>
                    <h2>Практичні можливості:</h2>
                    <p></p>
                    <h2>Завдання для студентів:</h2>
                    <p></p>
                    <h2>Висновки:</h2>
                    <p></p>
                    <h2>Джерела та додаткові матеріали:</h2>
                    <p></p>
        `,
      course: selectedCourse ?? "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (!questions.length) {
        showError("Обов'зяково додайте тест по навчальному матеріалу");
        return;
      }

      if (isValid) {
        createMaterialMutation({
          ...values,
          test: {
            questions,
            summaryScore: questions.reduce(
              (total, question) => total + question.points,
              0
            ),
          },
          kind: MaterialType.Article,
        });
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
    values,
    errors,
    touched,
  } = formik;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" id="articleForm">
        <FormInput
          id="title"
          label="Заголовок"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && errors.title ? errors.title : undefined}
          required
          disabled={((isSubmitting && !isValid) || isCreating) && !isError}
        />

        <div>
          <Label htmlFor="content" className="block mb-3 font-medium">
            Редактор статті
          </Label>
          <SimpleEditor
            value={values.content}
            onChange={(html: string) => setFieldValue("content", html)}
          />
          {touched.content && errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
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
        form="articleForm"
        className="w-full mt-5 font-bold text-lg"
        disabled={((isSubmitting && !isValid) || isCreating) && !isError}
      >
        {isEditingMode ? "Оновити" : "Створити"}
      </Button>
    </>
  );
};

export default ArticleForm;
