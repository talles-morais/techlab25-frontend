"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../FormInput";
import { fetcher } from "@/lib/fetcher";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import MuiDivider from "@/components/mui/Divider";
import GoogleLoginButton from "../GoogleLoginButton";
import { jwtDecode } from "jwt-decode";

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
  const router = useRouter();
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
          onClick: () => router.push("/login"),
        },
      });

      reset();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Algo deu errado";
      toast.error(errorMessage);
    }
  }

  async function handleGoogleLoginSuccess(credentialResponse: any) {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential!);

      await fetcher("/login/google", {
        method: "POST",
        body: JSON.stringify({
          token: credentialResponse.credential,
          email: decoded.email,
          name: decoded.name,
        }),
      });

      toast.success("Login com Google realizado!", {
        description: "Redirecionando para seu dashboard...",
      });

      router.push("/");
    } catch (error) {
      console.error("Erro no login Google:", error);
      toast.error("Falha ao logar com Google");
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col items-center w-full"
      >
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
      </form>

      <MuiDivider colorHex="#020122" />

      <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} />

      <Toaster richColors />
    </div>
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
