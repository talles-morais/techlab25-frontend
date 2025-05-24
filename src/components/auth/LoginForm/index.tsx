"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../FormInput";
import { fetcher } from "@/lib/fetcher";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

type FormInputData = {
  email: string;
  password: string;
};

export const registerSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function LoginForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  async function submitHandler(data: FormInputData) {
    try {
      await fetcher("/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toast.success("Bem vindo(a)!", {
        description: "Redirecionando para seu dashboard...",
      });

      reset();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Algo deu errado";
      toast.error(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full">
      <div className="flex flex-col gap-2 md:gap-4 my-3">
        {formFields.map((field) => (
          <FormInput
            key={field.placeholder}
            placeholder={field.placeholder}
            type={field.type}
            {...register(field.name)}
            error={errors[field.name]?.message}
          />
        ))}
      </div>

      <button
        type="submit"
        className="bg-primary text-white rounded-lg py-2 px-3 w-full font-bold text-lg hover:scale-105 transition-all md:text-2xl"
      >
        Fazer login
      </button>

      <Toaster richColors />
    </form>
  );
}

const formFields: {
  name: "email" | "password";
  type: string;
  placeholder: string;
}[] = [
  {
    name: "email",
    placeholder: "E-mail",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Senha",
    type: "password",
  },
];
