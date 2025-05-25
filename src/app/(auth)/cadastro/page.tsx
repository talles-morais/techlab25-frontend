import RegisterForm from "@/components/auth/RegisterForm";
import MuiDivider from "@/components/mui/Divider";
import Image from "next/image";
import Link from "next/link";

export default function CadastroPage() {
  return (
    <div className="h-[100dvh] flex justify-center items-center font-work-sans">
      <main className="flex flex-col items-center rounded-lg bg-light-background px-3 py-14 max-w-[90vw] md:text-xl sm:max-w-[500px] w-full">
        <Image
          className="mb-4"
          sizes="100vw"
          style={{ width: "80%", height: "auto" }}
          src="/logo/light-horizontal-with-slogan.svg"
          width={260}
          height={87}
          alt="Logo do EconoView, em formato horizontal, com ícone e slogan dizendo 'Bem vindo(a) ao EconoView, seu app de finanças pessoal!"
        />

        <h1 className="font-bold text-xl md:text-3xl">Cadastre-se</h1>

        <RegisterForm />

        <span className="text-xs md:text-base mt-2">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="inline-block underline font-bold hover:scale-105 transition-all"
          >
            Faça login
          </Link>
        </span>
      </main>
    </div>
  );
}
