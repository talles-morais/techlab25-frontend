import { Eye, EyeOff } from "lucide-react";

export default function WelcomeBalance() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1>
        Olá, <span className="font-bold">Talles Alves!</span>
      </h1>

      {/*  balance */}
      <div className="flex flex-col items-center">
        <span className="text-sm">Saldo total</span>
        <button className="text-3xl flex items-center gap-2">
          <span className="font-bold">
            R$ {(2416).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}{" "}
          </span>
          <EyeOff size={16}/>
        </button>
      </div>
    </div>
  );
}
