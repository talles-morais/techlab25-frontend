"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "../FormInput";
import { fetcher } from "@/lib/fetcher";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import GoogleLoginButton from "../GoogleLoginButton";
import MuiDivider from "@/components/mui/Divider";
import { GoogleLogin } from "@react-oauth/google";

type FormInputData = {
  email: string;
  password: string;
};

export const registerSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function LoginForm() {
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
      await fetcher("/login", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toast.success("Bem vindo(a)!", {
        description: "Redirecionando para seu dashboard...",
      });

      reset();
      router.push("/");
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

      router.push("/dashboard");
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
          Fazer login
        </button>
      </form>

      <MuiDivider colorHex="#020122" />

      <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} />

      <Toaster richColors />
    </div>
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
