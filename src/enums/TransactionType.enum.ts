export enum TransactionType {
  INCOME = 0,
  EXPENSE = 1,
  TRANSFER = 2,
}

export const TransactionTypeLabels: Record<TransactionType, string> = {
  [TransactionType.INCOME]: "Crédito",
  [TransactionType.EXPENSE]: "Débito",
  [TransactionType.TRANSFER]: "Transferência",
};
