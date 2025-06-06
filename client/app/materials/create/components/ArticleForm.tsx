import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, Specification } from "@shared/types";
import { SpecificationeNameUA } from "@shared/types/Enums";
import TestForm from "./TestForm";

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

const ArticleForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const handleQuestionsChange = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
  };
  const [showValidation, setShowValidation] = useState(false);

  const formik = useFormik<ArticleFormData>({
    initialValues: {
      title: "",
      content: "",
      type: specificationOptions[0],
      testId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      //! FIX
      setShowValidation(true);
      console.log("📝 Submit:", values);
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
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
          <Textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Напишіть текст статті..."
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={`block w-full rounded-md border p-2 ${
              touched.content && errors.content
                ? "border-red-600"
                : "border-gray-300"
            }`}
          />
          {touched.content && errors.content && (
            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
          )}
        </div>
      </form>

      <TestForm
        questions={questions}
        onQuestionsChange={handleQuestionsChange}
        showValidationErrors={showValidation}
      />

      <Button
        type="submit"
        disabled={isSubmitting}
        form="articleForm"
        className="w-full mt-5 font-bold text-lg"
      >
        Створити
      </Button>
    </>
  );
};

export default ArticleForm;
