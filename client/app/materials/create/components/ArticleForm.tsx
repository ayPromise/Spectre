import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, Specification } from "@shared/types";
import {
  MaterialType,
  MaterialTypeNameUA,
  SpecificationeNameUA,
} from "@shared/types/Enums";
import TestForm from "./TestForm";
import { showError, showSuccess } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import createMaterial from "../utils/createMaterial";
import { useRouter } from "next/navigation";
import { CreateArticlePayload } from "@/types/CreateMaterialPayload";
import { useMaterials } from "@/context/MaterialsContext";
import { SimpleEditor } from "@/components/tiptap/tiptap-templates/simple/simple-editor";

type ArticleFormData = {
  title: string;
  content: string;
  type: Specification;
  testId?: string;
};

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Заголовок обовʼязковий"),
  content: Yup.string().trim().required("Контент обовʼязковий"),
  type: Yup.mixed<Specification>()
    .oneOf(Object.values(Specification), "Невірний тип")
    .required("Тип обовʼязковий"),
  testId: Yup.string().optional(),
});

const specificationOptions = Object.values(Specification);

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

const ArticleForm: React.FC = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>(defaultTest);
  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };
  const [isValid, setIsValid] = useState(false);
  const { refetch } = useMaterials();
  const { mutate: createMaterialMutation, isPending: isCreating } = useMutation(
    {
      mutationFn: (data: CreateArticlePayload) => createMaterial(data),
      onSuccess: (article) => {
        const kind = article.kind.toLocaleLowerCase();
        const id = article._id;
        showSuccess(
          `${MaterialTypeNameUA[MaterialType.Article]} була успішно створена 🎉`
        );
        refetch();
        router.push(`/materials/${kind}/${id}`);
      },
      onError: (error: Error) => {
        showError(error.message || "Не вдалося створити матеріал");
      },
    }
  );
  const formik = useFormik<ArticleFormData>({
    initialValues: {
      title: "",
      content: `<h1>Початок роботи з дроном:</h1>
                    <p></p>
                    <h2>Мета розділу:</h2>
                    <p></p>
                    <h2>Основні поняття:</h2>
                    <p></p>
                    <h2>Огляд компонентів дрона:</h2>
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
      type: specificationOptions[0],
    },
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
        />

        <div>
          <Label htmlFor="type" className="block mb-3 font-medium">
            Тип статті
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
          <Label htmlFor="content" className="block mb-3 font-medium">
            Контент
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
        disabled={(isSubmitting && !isValid) || isCreating}
      >
        Створити
      </Button>
    </>
  );
};

export default ArticleForm;
