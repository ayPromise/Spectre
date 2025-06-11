"use client";

import React from "react";
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

import { showSuccess, showError } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@shared/types";
import generatePassword from "./utils/generatePassword";
import createUser from "./utils/createUser";
import { CreateUserPayload } from "@/types/UserPayloads";

const validationSchema = Yup.object({
  email: Yup.string().email("Невірний email").required("Обов'язкове поле"),
  phoneNumber: Yup.string()
    .matches(/^\+380\d{9}$/, "Формат: +380XXXXXXXXX")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Мінімум 8 символів")
    .required("Обов'язкове поле"),
  firstName: Yup.string().required("Обов'язкове поле"),
  lastName: Yup.string().required("Обов'язкове поле"),
  role: Yup.mixed<UserRole>().oneOf(Object.values(UserRole), "Невірна роль"),
});

const UserCreationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const initialFirstName = searchParams.get("firstName") || "";
  const initialLastName = searchParams.get("lastName") || "";
  const initialPhoneNumber =
    `+${searchParams.get("phoneNumber")?.trim()}` || "";

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      showSuccess("Користувача створено успішно 🎉");
      router.push("/dashboard/users");
    },
    onError: (error: Error) => {
      showError(error.message || "Помилка при створенні користувача");
    },
  });

  const formik = useFormik<CreateUserPayload>({
    initialValues: {
      email: initialEmail,
      phoneNumber: initialPhoneNumber,
      password: "",
      firstName: initialFirstName,
      lastName: initialLastName,
      role: UserRole.Student,
    },
    validationSchema,
    onSubmit: (values) => {
      createUserMutation(values);
    },
  });

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <h1 className="font-bold text-3xl">Створення користувача</h1>
      <FormInput
        id="email"
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email ? errors.email : undefined}
        required
      />

      <FormInput
        id="firstName"
        label="Ім’я"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.firstName && errors.firstName ? errors.firstName : undefined
        }
        required
      />

      <FormInput
        id="lastName"
        label="Прізвище"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.lastName && errors.lastName ? errors.lastName : undefined
        }
        required
      />

      <FormInput
        id="phoneNumber"
        label="Номер телефону"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.phoneNumber && errors.phoneNumber
            ? errors.phoneNumber
            : undefined
        }
        required
      />

      <div className="flex items-end gap-2">
        <div className="flex-grow">
          <FormInput
            id="password"
            label="Пароль"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.password && errors.password ? errors.password : undefined
            }
            required
          />
        </div>
        <Button
          type="button"
          onClick={() => setFieldValue("password", generatePassword())}
          className="align-bottom"
        >
          Згенерувати
        </Button>
      </div>

      <div>
        <Label htmlFor="role" className="block mb-2">
          Роль
        </Label>
        <Select
          name="role"
          value={values.role}
          defaultValue="Student"
          onValueChange={(val) => setFieldValue("role", val)}
        >
          <SelectTrigger className="w-full border p-2 rounded-md">
            <SelectValue placeholder="Оберіть роль..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.Student}>Студент</SelectItem>
            <SelectItem value={UserRole.Instructor}>Інструктор</SelectItem>
          </SelectContent>
        </Select>
        {touched.role && errors.role && (
          <p className="text-red-600 text-sm mt-1">{errors.role}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending && isSubmitting}
        className="w-full"
      >
        Створити користувача
      </Button>
    </form>
  );
};

export default UserCreationForm;
