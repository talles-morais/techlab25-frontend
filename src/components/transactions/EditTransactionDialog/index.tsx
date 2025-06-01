"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcnui/dialog"; 
import TransactionForm from "../TransactionForm"; 
import {
  TransactionFormData
} from "@/schemas/newTransactionValidator"; 
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";
import { TransactionType } from "@/enums/TransactionType.enum";

export interface ApiTransaction {
  id: string;
  description: string;
  amount: number;
  date: string | Date; 
  type: TransactionType; 
  category: { id: string; name: string }; 
  fromAccount?: { id: string; name: string };
  toAccount?: { id: string; name: string };

}

interface EditTransactionDialogProps {
  transactionId: string;
  isOpen: boolean;
  onClose: () => void;
  onTransactionUpdated: () => void;
}

const mapApiTransactionToFormData = (
  apiTransaction: ApiTransaction
): TransactionFormData => {
  return {
    description: apiTransaction.description,
    amount: apiTransaction.amount,
    date: new Date(apiTransaction.date).toISOString().split("T")[0], 
    categoryId: apiTransaction.category.id,
    type: apiTransaction.type, 
    fromAccountId: apiTransaction.fromAccount?.id || undefined, 
    toAccountId: apiTransaction.toAccount?.id || undefined,   
  };
};

export default function EditTransactionDialog({
  transactionId,
  isOpen,
  onClose,
  onTransactionUpdated,
}: EditTransactionDialogProps) {
  const [initialDataForForm, setInitialDataForForm] =
    useState<Partial<TransactionFormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && transactionId) {
      const fetchTransactionData = async () => {
        setIsLoading(true);
        setError(null);
        setInitialDataForForm(null); 
        try {

          const response = await fetcher<ApiTransaction>(
            `/transactions/${transactionId}` 
          );

          if (response.ok && response.data) {
            setInitialDataForForm(mapApiTransactionToFormData(response.data));
          }
        } catch (err) {
          console.error("Error fetching transaction data:", err);
          const errorMessage =
            err instanceof Error ? err.message : "Um erro inesperado ocorreu.";
          setError(errorMessage);
          toast.error(`Erro ao carregar transação: ${errorMessage}`);
        } finally {
          setIsLoading(false);
        }
      };
      fetchTransactionData();
    }
  }, [isOpen, transactionId]);

  const handleUpdateTransaction = async (formData: TransactionFormData) => {
    if (!transactionId) return;

    try {
      const response = await fetcher(
        `/transactions/${transactionId}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Transação atualizada com sucesso!");
        onTransactionUpdated(); 
        onClose(); 
      } 
    } catch (err) {
      console.error("Error updating transaction:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Um erro inesperado ocorreu.";
      toast.error(`Erro ao atualizar transação: ${errorMessage}`);
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading && <p className="text-center">Carregando dados...</p>}
          {error && !isLoading && (
            <p className="text-center text-red-600">Erro: {error}</p>
          )}
          {!isLoading && !error && initialDataForForm && (
            <TransactionForm
              key={transactionId} 
              initialData={initialDataForForm}
              onFormSubmit={handleUpdateTransaction}
              onCancel={onClose}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}