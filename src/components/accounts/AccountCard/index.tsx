import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcnui/popover";
import ConfirmAction from "@/components/shared/ConfirmAction";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { toast } from "sonner";
import EditAccountDialog from "../EditAccountDialog";
import { BankAccount } from "../AccountsCarousel";
import { BankAccountTypeLabels } from "@/enums/BankAccountType.enum";

interface AccountCardProps {
  bankAccount: BankAccount
  onActionCompleted: () => void;
}

export default function AccountCard({
  bankAccount,
  onActionCompleted,
}: AccountCardProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  async function handleDeleteAccount() {
    try {
      const response = await fetcher(`/bank-accounts/${bankAccount.id}`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        toast.success("Conta deletada com sucesso");
        onActionCompleted();
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
          className="flex flex-col justify-between items-start text-start bg-light-background border border-primary rounded-lg px-3 py-2 w-full min-h-36"
        >
          <h1 className="text-lg font-bold">{bankAccount.name}</h1>
          <h2 className="text-sm">{BankAccountTypeLabels[bankAccount.type]}</h2>

          <span className="text-xl font-bold whitespace-nowrap">
            R$ {bankAccount.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>

          {/* {icon && (
            <figure className="block relative min-w-8 w-fit h-6 self-end">
              <Image src={icon} fill alt="Ícone do banco" className="max-h-6" />
            </figure>
          )} */}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-4">
          <h1>Opções</h1>

          <Button
            onClick={() => setEditDialogOpen(true)}
            className="hover:scale-105 transition-all"
          >
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

      <EditAccountDialog
        dialogOpen={editDialogOpen}
        setDialogOpen={setEditDialogOpen}
        bankAccount={bankAccount}
        onEdit={onActionCompleted}
      />
    </Popover>
  );
}
