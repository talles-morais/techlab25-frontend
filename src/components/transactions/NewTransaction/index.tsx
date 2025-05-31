"use client";
import { Button } from "@/components/shadcnui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcnui/dialog";
import { Plus } from "lucide-react";
import TransactionForm from "../TransactionForm";
import { TransactionFormData } from "@/schemas/newTransactionValidator";
import { useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";

interface NewTransactionProps {
  handleTransactionCreated: () => void;
}

export default function NewTransaction({ handleTransactionCreated }: NewTransactionProps) {
  const [open, setOpen] = useState(false);
  const handleFormSubmit = async (data: TransactionFormData) => {
    try {
      const response = await fetcher("/transactions", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Transação adicionada com sucesso");
        console.log("Transação salva com sucesso!");
        setOpen(false); // Fecha o modal
      }
      handleTransactionCreated()
    } catch (error: any) {
      const message = error?.message || "Erro ao adicionar transação";
      toast.error(message);
    }
    setOpen(false); // Fecha o modal após o envio (ou sucesso da API)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="border border-light-secondary bg-primary ">
          Nova transação <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-start sm:max-w-md bg-light-background">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="font-bold text-xl">
            Criar nova transação
          </DialogTitle>
        </DialogHeader>
        <TransactionForm
          onFormSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
