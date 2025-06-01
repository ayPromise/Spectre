import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 w-[500px]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Увійдіть в свій акаунт</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
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
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
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
