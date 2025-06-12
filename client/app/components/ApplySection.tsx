"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/custom/FormInput";
import emailjs from "@emailjs/browser";
import { showError, showSuccess } from "@/utils/toast";
import FormTextarea from "@/components/custom/FormTextarea";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Обов'язкове поле"),
  lastName: Yup.string().required("Обов'язкове поле"),
  email: Yup.string()
    .email("Неправильний формат адреси")
    .required("Це поле не може бути пустим"),
  phoneNumber: Yup.string()
    .min(10, "Неправильний формат")
    .required("Це поле не може бути пустим"),
  motivation: Yup.string()
    .min(10, "Що це за мотиваційний лист менше 10 літер?")
    .required("Нам важливо знати вашу мотивацію"),
});

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_APPLY_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const ApplySection: React.FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      motivation: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsPending(true);
        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
          return;
        }
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            motivation: values.motivation,
          },
          PUBLIC_KEY
        );
        showSuccess(
          "Дякуємо за лист! Очікуйте на відповідь або дзвінок на вказаний номер."
        );
        resetForm();
        setIsPending(false);
      } catch (error) {
        showError("Помилка при відправці листа. Спробуйте пізніше.");
        console.error(error);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const {
    values,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setFieldError,
  } = formik;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formik.handleChange(e);

    const { name } = e.target;
    if (errors[name as keyof typeof errors]) {
      setFieldError(name as keyof typeof errors, "");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className="space-y-6 w-xl">
        <h1 className="text-3xl font-bold mb-4" id="apply">
          Подати заявку
        </h1>
        <div className="flex gap-4">
          <div className="flex-1">
            <FormInput
              id="firstName"
              label="Ім'я"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
              required
              disabled={isSubmitting || isPending}
            />
          </div>
          <div className="flex-1">
            <FormInput
              id="lastName"
              label="Прізвище"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
              required
              disabled={isSubmitting || isPending}
            />
          </div>
        </div>

        <FormInput
          id="email"
          label="Пошта"
          type="email"
          placeholder="example@mail.com"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          required
          disabled={isSubmitting || isPending}
        />

        <FormInput
          id="phoneNumber"
          label="Номер телефону"
          type="text"
          placeholder="(38)___-___-__-__"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phoneNumber && errors.phoneNumber}
          required
          disabled={isSubmitting || isPending}
        />

        <FormTextarea
          id="motivation"
          label="Мета"
          placeholder="Яка ваша мета?"
          name="motivation"
          value={values.motivation}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.motivation && errors.motivation}
          required
          disabled={isSubmitting || isPending}
        />

        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          className="w-full"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ApplySection;
