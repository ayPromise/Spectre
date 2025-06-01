import React from "react";

// COMPONENTS
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | false;
  required?: boolean;
};

const FormInput: React.FC<Props> = ({
  id,
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-3 relative">
      <Label htmlFor={id} className="font-medium">
        {label}
        {error && (
          <span className="text-red-600 whitespace-nowrap">{error}</span>
        )}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
    </div>
  );
};

export default FormInput;
