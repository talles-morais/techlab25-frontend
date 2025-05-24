import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
}

export default function FormInput({
  type,
  placeholder,
  ...rest
}: FormInputProps) {
  return (
    <input
      className="w-full bg-white border border-primary rounded-lg py-2 px-3 placeholder:text-light-secondary/40"
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}
