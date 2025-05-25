"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormInput from "@/components/custom/FormInput";

type Inputs = {
  email: string;
  phoneNumber: string;
  motivation: string;
};

const ApplySection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4" id="apply">
        Apply
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="example@mail.com"
          register={register}
          name="email"
          errors={errors}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          }}
        />

        <FormInput
          id="phoneNumber"
          label="Phone Number"
          type="text"
          placeholder="(38)___-___-__-__"
          register={register}
          name="phoneNumber"
          errors={errors}
          validationRules={{
            required: "Phone number is required",
            minLength: { value: 14, message: "Phone number too short" },
          }}
        />

        <div>
          <Label htmlFor="motivation" className="block mb-1 font-medium">
            Motivation
          </Label>
          <Textarea
            id="motivation"
            placeholder="Яка ваша мета?"
            rows={5}
            {...register("motivation", {
              required: "Please write your motivation",
              minLength: { value: 10, message: "Too short" },
            })}
          />
          {errors.motivation && (
            <p className="text-red-600 text-sm mt-1">
              {errors.motivation.message}
            </p>
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
