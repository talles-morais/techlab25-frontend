import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcnui/popover";
import ConfirmAction from "@/components/shared/ConfirmAction";
import Image from "next/image";

interface AccountCardProps {
  bankName: string;
  accountType: string;
  balance: number;
  icon?: string;
}

export default function AccountCard({
  bankName,
  accountType,
  balance,
  icon,
}: AccountCardProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-col justify-between items-start bg-light-background border border-primary rounded-lg px-3 py-2 min-h-36"
        >
          <h1 className="text-lg font-bold">{bankName}</h1>
          <h2 className="text-sm">{accountType}</h2>

          <span className="text-xl font-bold whitespace-nowrap">
            R$ {balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>

          {icon && (
            <figure className="block relative min-w-8 w-fit h-6 self-end">
              <Image src={icon} fill alt="Ícone do banco" className="max-h-6" />
            </figure>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <h1>Opções</h1>

          <Button className="hover:scale-105 transition-all">
            Editar Conta
          </Button>

          <ConfirmAction
            title="Deletar conta"
            description="Esta ação é irreversível"
            onConfirm={() => console.log("deleta")}
          >
            <Button
              className="hover:scale-105 transition-all"
              variant="destructive"
            >
              Deletar conta
            </Button>
          </ConfirmAction>
        </div>
      </PopoverContent>
    </Popover>
  );
}
