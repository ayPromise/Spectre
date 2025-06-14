"use client";

// HOOKS
import React from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";

// UTILS
import { showError, showSuccess } from "@/utils/toast";
import * as Yup from "yup";
import signIn from "./utils/signIn";
import emailjs from "@emailjs/browser";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import FormInput from "@/components/custom/FormInput";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_APPLY_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refetchUser } = useAuth();
  const redirectURL = searchParams.get("redirectURL") || "/";

  const { mutate, isPending, isError } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      refetchUser();
      showSuccess(data.message);
      router.push(redirectURL);
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

  const sendResetPasswordMail = async () => {
    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        return;
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          firstName: "RESET PASSWORD DATA",
          lastName: "RESET PASSWORD DATA",
          email: "RESET PASSWORD DATA",
          phoneNumber: "RESET PASSWORD DATA",
          motivation: "RESET PASSWORD DATA",
        },
        PUBLIC_KEY
      );
      showSuccess("Лист з вашим новим паролем з'явиться на вашій пошті.");
    } catch (error) {
      showError("Помилка при відправці листа. Спробуйте пізніше.");
      console.error(error);
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
                    required
                    disabled={(isPending || isSubmitting) && !isError}
                  />
                </div>
                <div className="grid gap-3 relative">
                  <div
                    className="absolute right-0 -top-3"
                    onClick={sendResetPasswordMail}
                  >
                    <span className="ml-auto inline-block text-sm underline-offset-4 underline cursor-pointer">
                      Забули свій пароль?
                    </span>
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
                    disabled={(isPending || isSubmitting) && !isError}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={(isPending || isSubmitting) && !isError}
                >
                  {(isPending || isSubmitting) && !isError
                    ? "Зачекайте..."
                    : "Увійти"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Бажаєте приєднатися до{" "}
                <span className="saira font-bold">SPECTRE</span> ?{" "}
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
};

export default SignInPage;
