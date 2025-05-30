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
import { Plus } from "lucide-react";

export default function NewTransaction() {
  return (
    <Dialog>
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
        <form className="flex flex-col gap-2 w-full">
          {formFields.map((field) => (
            <FormInput
              key={field.placeholder}
              type={field.type}
              placeholder={field.placeholder}
            />
          ))}
        </form>
        <DialogFooter className="flex flex-row w-full justify-between ">
          <DialogClose asChild>
            <Button type="button" variant="destructive" className="text-lg">
              Cancelar
            </Button>
          </DialogClose>

          <Button className="flex-1 font-bold text-lg">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const formFields: {
  type: string;
  placeholder: string;
}[] = [
  {
    type: "text",
    placeholder: "Descrição",
  },
  {
    type: "number",
    placeholder: "Valor",
  },
  {
    type: "date",
    placeholder: "Data",
  },
];
