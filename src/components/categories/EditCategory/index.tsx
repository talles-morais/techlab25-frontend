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
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { IconPickerDialog } from "../IconPickerDialog";

interface EditCategoryProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  initialName: string;
  initialIconName: string | null;
  onSubmit: (updatedCategory: { name: string; iconName: string | null }) => Promise<void>;
}

export default function EditCategory({
  dialogOpen,
  setDialogOpen,
  initialName,
  initialIconName,
  onSubmit,
}: EditCategoryProps) {
  const [iconName, setIconName] = useState<string | null>(initialIconName);
  const [name, setName] = useState<string>(initialName);
  const [iconDialogOpen, setIconDialogOpen] = useState(false);

  // Atualiza o estado local se as props iniciais mudarem
  useEffect(() => {
    setName(initialName);
    setIconName(initialIconName);
  }, [initialName, initialIconName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, iconName });
    setDialogOpen(false);
  };

  const SelectedIcon = iconName ? (LucideIcons as any)[iconName] : null;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="flex flex-col items-start sm:max-w-md bg-light-background">
        <DialogHeader className="flex flex-col items-start">
          <DialogTitle className="font-bold text-xl">
            Editar categoria
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
