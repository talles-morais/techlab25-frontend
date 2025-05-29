import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcnui/popover";
import ConfirmAction from "@/components/shared/ConfirmAction";
import { fetcher } from "@/lib/fetcher";
import Image from "next/image";
import { toast } from "sonner";

interface AccountCardProps {
  accountId: string;
  bankName: string;
  accountType: string;
  balance: number;
  icon?: string;
  onAccountDeleted: () => void;
}

export default function AccountCard({
  accountId,
  bankName,
  accountType,
  balance,
  icon,
  onAccountDeleted,
}: AccountCardProps) {
  async function handleDeleteAccount() {
    try {
      const response = await fetcher(`/bank-accounts/${accountId}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        toast.success("Conta deletada com sucesso");
        onAccountDeleted();
      }
    } catch (error: any) {
      const message = error?.message || "Erro ao deletar a categoria";
      toast.error(message);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex flex-col justify-between items-start text-start bg-light-background border border-primary rounded-lg px-3 py-2 min-h-36"
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
            onConfirm={handleDeleteAccount}
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
