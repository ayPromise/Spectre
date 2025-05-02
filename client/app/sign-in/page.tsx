import React from "react";
import SignInForm from "./components/SignInForm";

export const dynamic = 'force-dynamic';


const SignInPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <SignInForm />
        </div>
    );
};

export default SignInPage