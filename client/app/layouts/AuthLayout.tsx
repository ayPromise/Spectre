"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/custom/Loader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, userData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth || !userData) {
      console.log(
        `Redirecting to /sign-in from AuthLayout due to lack of auth`
      );
      router.push("/sign-in");
    }
  }, [isAuth, userData, router]);

  if (!isAuth || !userData) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthLayout;
