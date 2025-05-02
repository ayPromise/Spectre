"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";


const SignInForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add actual sign-in logic
        console.log({ email, password });
    };

    return (
        <Card className="max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email and password to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="johndoe@example.com"
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/password-reset" className="text-sm text-primary underline">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pr-24"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:underline"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}

                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/#apply" className="underline">
                        Apply the form
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default SignInForm;
