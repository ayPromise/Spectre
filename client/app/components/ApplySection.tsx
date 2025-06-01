"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/custom/FormInput";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Неправильний формат адреси")
    .required("Це поле не може бути пустим"),
  phoneNumber: Yup.string()
    .min(14, "Неправильний формат")
    .required("Це поле не може бути пустим"),
  motivation: Yup.string()
    .min(10, "Що це за мотиваційний лист менше 10 літер?")
    .required("Не забудьте вказати ваші мотиви"),
});

const ApplySection: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      motivation: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      resetForm();
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const { values, handleBlur, handleSubmit, errors, touched, isSubmitting } =
    formik;

  const handleChange = (e: React.ChangeEvent) => {
    formik.handleChange(e);

    if (formik.errors.email) {
      formik.setFieldError("email", "");
    }
    if (formik.errors.phoneNumber) {
      formik.setFieldError("phoneNumber", "");
    }
    if (formik.errors.motivation) {
      formik.setFieldError("motivation", "");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" id="apply">
        Apply
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />

        <FormInput
          id="phoneNumber"
          label="Phone Number"
          type="text"
          placeholder="(38)___-___-__-__"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phoneNumber && errors.phoneNumber}
        />

        <div>
          <Label htmlFor="motivation" className="block mb-1 font-medium">
            Motivation
          </Label>
          <Textarea
            id="motivation"
            name="motivation"
            rows={5}
            placeholder="Яка ваша мета?"
            value={values.motivation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.motivation && errors.motivation && (
            <p className="text-red-600 text-sm mt-1">{errors.motivation}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ApplySection;
