import React from "react";
import { LoginForm } from "./components/LoginForm";
export const dynamic = "force-dynamic";

const SignInPage: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default SignInPage;
