"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../FormInput";
import { fetcher } from "@/lib/fetcher";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

type FormInputData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = z
  .object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

export default function RegisterForm() {
  const router = useRouter()
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
      await fetcher("/register", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toast.success("Cadastrado com sucesso", {
        description: "Vá para a página de login",
        action: {
          label: "Login",
          onClick: () => router.push("/login")
        }
      })

      reset();
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Algo deu errado";
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
        Cadastrar
      </button>

      <Toaster richColors/>
    </form>
  );
}

const formFields: {
  name: "name" | "email" | "password" | "confirmPassword";
  type: string;
  placeholder: string;
}[] = [
  {
    name: "name",
    placeholder: "Nome",
    type: "text",
  },
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
  {
    name: "confirmPassword",
    placeholder: "Confirme sua senha",
    type: "password",
  },
];
