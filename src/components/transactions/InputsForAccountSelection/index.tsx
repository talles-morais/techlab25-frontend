import { TransactionType } from "@/enums/TransactionType.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnui/select";
import { BankAccount } from "@/components/accounts/AccountsCarousel";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { TransactionFormData } from "@/schemas/newTransactionValidator";

interface InputsForAccountSelectionProps {
  transactionType: TransactionFormData["type"]  | undefined;
  control: Control<TransactionFormData>;
  errors: FieldErrors<TransactionFormData>;
  accounts: BankAccount[];
}

export default function InputsForAccountSelection({
  transactionType,
  control,
  errors,
  accounts,
}: InputsForAccountSelectionProps) {
  console.log(transactionType);
  

  const renderAccountSelect = (
    name: "fromAccountId" | "toAccountId",
    label: string,
    placeholder: string
  ) => (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={`${name}-select`}
        className="text-sm font-medium text-gray-700"
      >
        {label}:
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
            disabled={accounts.length === 0}
          >
            <SelectTrigger
              className={`bg-white flex-1 ${
                errors[name] ? "border-red-500" : ""
              }`}
              id={`${name}-select`}
            >
              <SelectValue
                placeholder={
                  accounts.length === 0
                    ? "Nenhuma conta disponível"
                    : placeholder
                }
              />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  switch (transactionType) {
    case TransactionType.INCOME:
      return (
        <div className="border rounded-lg p-3 bg-white/50">
          {renderAccountSelect(
            "toAccountId",
            "Conta de destino",
            "Selecione a conta de destino"
          )}
        </div>
      );
    case TransactionType.EXPENSE:
      return (
        <div className="border rounded-lg p-3 bg-white/50">
          {renderAccountSelect(
            "fromAccountId",
            "Conta de origem",
            "Selecione a conta de origem"
          )}
        </div>
      );
    case TransactionType.TRANSFER:
      return (
        <div className="flex flex-col gap-3 border rounded-lg p-3 bg-white/50">
          {renderAccountSelect(
            "fromAccountId",
            "Conta de origem",
            "Selecione a conta de origem"
          )}
          {renderAccountSelect(
            "toAccountId",
            "Conta de destino",
            "Selecione a conta de destino"
          )}
        </div>
      );
    default:
      return null;
  }
}
