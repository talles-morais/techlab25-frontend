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
import { IconPickerDialog } from "../IconPickerDialog"; // ajuste a importação
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { fetcher } from "@/lib/fetcher";
interface NewCategoryProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

export default function NewCategory({
  dialogOpen,
  setDialogOpen,
}: NewCategoryProps) {
  const [iconName, setIconName] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [iconDialogOpen, setIconDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetcher("/categories/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        iconName,
      }),
    });
    setDialogOpen(false);
  };

  const SelectedIcon = iconName ? (LucideIcons as any)[iconName] : null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="border border-light-secondary bg-primary text-xs md:text-base">
          Categoria <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-start sm:max-w-md bg-light-background">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="font-bold text-xl">
            Criar nova categoria
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIconDialogOpen(true)}
              type="button"
            >
              {SelectedIcon ? (
                <SelectedIcon className="w-6 h-6" />
              ) : (
                "Selecionar Ícone"
              )}
            </Button>

            {iconName && (
              <span className="text-sm text-gray-700">{iconName}</span>
            )}
          </div>

          <IconPickerDialog
            open={iconDialogOpen}
            onOpenChange={setIconDialogOpen}
            onSelect={(name) => setIconName(name)}
          />

          <FormInput
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
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
