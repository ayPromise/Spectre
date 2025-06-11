import React from "react";

// COMPONENTS
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  error?: string | false;
  required?: boolean;
  disabled?: boolean;
};

const FormTextarea: React.FC<Props> = ({
  id,
  label,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
}) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={id} className="font-medium h-[10px]">
        <span className="relative">
          {label}
          {required && (
            <span className="text-red-600 absolute -top-1 -right-2 leading-none">
              *
            </span>
          )}
        </span>
        {error && <span className="text-red-600 text-sm ml-2">{error}</span>}
      </Label>
      <Textarea
        ref={inputRef}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        isError={!!error}
        disabled={disabled}
      />
    </div>
  );
};

export default FormTextarea;
