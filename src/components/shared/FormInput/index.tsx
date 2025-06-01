import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  error?: string;
}

export default function FormInput({
  type,
  placeholder,
  error,
  ...rest
}: FormInputProps) {
  return (
    <div className="w-full">
      <input
        className={`w-full bg-white border ${
          error ? "border-red-500" : "border-primary"
        } rounded-lg py-2 px-3 placeholder:text-light-secondary/40 focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-primary"
        }`}
        type={type}
        placeholder={placeholder}
        step={0.01}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
