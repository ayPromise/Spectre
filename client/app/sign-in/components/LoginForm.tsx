"use client";

// HOOKS
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

// UTILS
import { cn } from "@/lib/utils";
import { showError, showSuccess } from "@/utils/toast";
import signIn from "../utils/signIn";
import * as Yup from "yup";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
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
      email: Yup.string().email("Невірний email").required("Обов'язково"),
      password: Yup.string().required("Обов'язково"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6 w-[500px]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Увійдіть в свій акаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/reset-password"
                    className="ml-auto inline-block text-sm underline-offset-4 underline"
                  >
                    Забули свій пароль?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="text-sm min-h-[1.5rem] text-red-500">
                  {formik.touched.password && formik.errors.password}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Зачекайте..." : "Увійти"}
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
  );
}
