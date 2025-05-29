import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/shadcnui/dialog";
import { Button } from "@/components/shadcnui/button";
import React from "react";

type ShadcnButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface ConfirmActionProps {
  /** O título exibido no cabeçalho do diálogo. */
  title: string;
  /** Uma descrição mais detalhada sobre a ação a ser confirmada. */
  description: string;
  /** Função a ser executada quando o usuário confirmar a ação. */
  onConfirm: () => void;
  /** O elemento que acionará a abertura do diálogo, passado como filho. */
  children: React.ReactNode;
  /** Texto a ser exibido no botão de confirmação. @default "Confirmar" */
  confirmText?: string;
  /** Variante do botão de confirmação. @default "default" */
  confirmButtonVariant?: ShadcnButtonVariant;
  /** Texto a ser exibido no botão de cancelamento. @default "Cancelar" */
  cancelText?: string;
  /** Função a ser executada quando o usuário cancelar a ação (opcional). */
  onCancel?: () => void;
}

export default function ConfirmAction({
  title,
  description,
  onConfirm,
  children,
  confirmText = "Confirmar",
  confirmButtonVariant = "destructive",
  cancelText = "Cancelar",
  onCancel,
}: ConfirmActionProps) {
  const handleConfirmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm();
  };

  const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={handleCancelClick}>
              {cancelText}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant={confirmButtonVariant}
              onClick={handleConfirmClick}
            >
              {confirmText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
