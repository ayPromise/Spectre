"use client";

// HOOKS
import React from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// UTILS
import { showError, showSuccess } from "@/utils/toast";
import * as Yup from "yup";
import signIn from "./utils/signIn";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import FormInput from "@/components/custom/FormInput";

export function SignInPage() {
  const router = useRouter();
  const { refetchUser } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      refetchUser();
      showSuccess(data.message);
      router.push("/");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      let errorMessage = error.message;
      if (errorMessage === "Invalid credentials") {
        errorMessage = "Введено невірні дані";
      }
      showError(errorMessage || "Помилка входу");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "test@example.com",
      password: "strongPassword123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Невірний формат пошти")
        .required("Це поле не може бути пустим"),
      password: Yup.string().required("Це поле не може бути пустим"),
    }),
    onSubmit: (values) => {
      mutate(values);
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
    if (formik.errors.password) {
      formik.setFieldError("password", "");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-6 w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle>Увійдіть в свій акаунт</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
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
                </div>
                <div className="grid gap-3 relative">
                  <div className="absolute right-0 -top-3">
                    <Link
                      href="/reset-password"
                      className="ml-auto inline-block text-sm underline-offset-4 underline"
                    >
                      Забули свій пароль?
                    </Link>
                  </div>
                  <FormInput
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    placeholder=""
                    required
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isSubmitting ? "Зачекайте..." : "Увійти"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Бажаєте приєднатися до Спектру?{" "}
                <Link href="/#apply" className="underline underline-offset-4">
                  Заповніть форму
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignInPage;
