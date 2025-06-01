export enum BankAccountType {
  CHECKING = 0,
  SAVINGS = 1,
  INVESTMENT = 2,
  OTHER = 3,
}

export const BankAccountTypeLabels: Record<BankAccountType, string> = {
  [BankAccountType.CHECKING]: "Conta-Corrente",
  [BankAccountType.SAVINGS]: "Poupança",
  [BankAccountType.INVESTMENT]: "Investimento",
  [BankAccountType.OTHER]: "Outro tipo",
};
