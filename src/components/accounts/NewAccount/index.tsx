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
  DialogTrigger,
} from "@/components/shadcnui/dialog";
import {
  BankAccountType,
  BankAccountTypeValues,
} from "@/enums/BankAccountType.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

type FormInputData = {
  name: string;
  type: BankAccountType;
  balance: number;
};

export const newAccountSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório"),
  type: z.nativeEnum(BankAccountType),
  balance: z
    .number()
    .finite("Saldo deve ser um número válido")
    .nonnegative("Saldo não pode ser negativo"),
});

export default function NewAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(newAccountSchema),
    mode: "onSubmit",
  });

  function submitHandler(data: FormInputData) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border border-light-secondary bg-primary ">
          Adicionar conta <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-start sm:max-w-md bg-light-background">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="font-bold text-xl">
            Criar nova conta
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-2 w-full"
        >
          {formFields.map((field) => (
            <FormInput
              key={field.placeholder}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, {
                valueAsNumber: field.name === "balance",
              })}
              error={errors[field.name]?.message}
            />
          ))}
          <label htmlFor="accountType">Tipo da conta</label>
          <select
            id="accountType"
            className="w-full bg-white border border-primary rounded-lg py-2 px-3 placeholder:text-light-secondary/40"
            {...register("type", { valueAsNumber: true })}
          >
            {BankAccountTypeValues.map((type, index) => (
              <option key={type} value={index}>
                {type}
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

const formFields: {
  name: "name" | "balance" | "type";
  type: string;
  placeholder: string;
}[] = [
  {
    type: "text",
    placeholder: "Name",
    name: "name",
  },
  {
    type: "number",
    placeholder: "Saldo inicial",
    name: "balance",
  },
];
