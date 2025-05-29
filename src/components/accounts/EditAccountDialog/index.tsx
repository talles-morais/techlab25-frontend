"use client";

import FormInput from "@/components/auth/FormInput";
import { Button } from "@/components/shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcnui/dialog";
import { useEffect, useState } from "react";
import z from "zod";
import {
  BankAccountType,
  BankAccountTypeLabels,
} from "@/enums/BankAccountType.enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetcher } from "@/lib/fetcher";
import { BankAccount } from "../AccountsCarousel";
import { toast } from "sonner";

interface EditAccountDialogProps {
  bankAccount: BankAccount;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onEdit: () => void;
}

const editAccountSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  type: z.nativeEnum(BankAccountType),
});

type FormInputData = z.infer<typeof editAccountSchema>;

export default function EditAccountDialog({
  dialogOpen,
  setDialogOpen,
  bankAccount,
  onEdit
}: EditAccountDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputData>({
    resolver: zodResolver(editAccountSchema),
    mode: "onSubmit",
    defaultValues: {
      name: bankAccount.name,
      type: bankAccount.type,
    },
  });

  useEffect(() => {
    reset({
      name: bankAccount.name,
      type: bankAccount.type,
    });
  }, [bankAccount, reset]);

  const submitHandler = async (data: FormInputData) => {
    try {
      const response = await fetcher(`/bank-accounts/${bankAccount.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Conta atualizada com sucesso");
      }
      setDialogOpen(false);
      onEdit()
    } catch (error: any) {
      const message = error?.message || "Erro ao atualizar a conta";
      toast.error(message);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="flex flex-col items-start sm:max-w-md bg-light-background">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="font-bold text-xl">Editar Conta</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-2 w-full"
        >
          <FormInput
            type="text"
            placeholder="Nome"
            {...register("name")}
            error={errors.name?.message}
          />

          <label htmlFor="accountType">Tipo da conta</label>
          <select
            id="accountType"
            className="w-full bg-white border border-primary rounded-lg py-2 px-3 placeholder:text-light-secondary/40"
            {...register("type", { valueAsNumber: true })}
          >
            {Object.values(BankAccountType)
              .filter(
                (type): type is BankAccountType => typeof type === "number"
              )
              .map((type) => (
                <option key={type} value={type}>
                  {BankAccountTypeLabels[type]}
                </option>
              ))}
          </select>

          <DialogFooter className="flex flex-row w-full justify-between ">
            <DialogClose asChild>
              <Button type="button" variant="destructive" className="text-lg">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" className="flex-1 font-bold text-lg">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
