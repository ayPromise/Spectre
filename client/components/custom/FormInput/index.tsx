"use client";

import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface FormInputProps<T extends FieldValues> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  errors?: FieldErrors;
  validationRules?: object;
}

function FormInput<T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  register,
  name,
  errors,
  validationRules,
}: FormInputProps<T>) {
  return (
    <div>
      <Label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, validationRules)}
      />
      {errors && errors[name] && (
        <p className="text-red-600 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}

export default FormInput;
