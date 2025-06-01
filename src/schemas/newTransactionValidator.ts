import { TransactionType } from "@/enums/TransactionType.enum";
import { z } from "zod";

export const transactionSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória"),
  amount: z.number().positive("Valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  categoryId: z.string().uuid("Categoria inválida"),
  type: z.nativeEnum(TransactionType),
  fromAccountId: z.string().uuid().optional().or(z.literal("")),
  toAccountId: z.string().uuid().optional().or(z.literal("")),
});

export type TransactionRequestData = {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  fromAccountId?: string;
  toAccountId?: string;
};

export type TransactionFormData = z.infer<typeof transactionSchema>;
