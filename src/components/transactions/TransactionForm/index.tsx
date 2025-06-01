"use client";
import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  TransactionFormData,
  TransactionRequestData,
} from "@/schemas/newTransactionValidator";
import { Button } from "@/components/shadcnui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnui/select";
import FormInput from "@/components/shared/FormInput";
import InputsForAccountSelection from "@/components/transactions/InputsForAccountSelection";
import { Category } from "@/components/categories/CategoryCard";
import { BankAccount } from "@/components/accounts/AccountsCarousel";
import { fetcher } from "@/lib/fetcher";
import {
  TransactionType,
  TransactionTypeLabels,
} from "@/enums/TransactionType.enum";

interface TransactionFormProps {
  onFormSubmit: (data: TransactionFormData) => Promise<void> | void; // Callback para quando o form for submetido
  onCancel: () => void;
  initialData?: Partial<TransactionFormData>;
}

export const mapFormDataToRequest = (
  data: TransactionFormData
): TransactionRequestData => {
  return {
    ...data,
    type: TransactionType[data.type] as "INCOME" | "EXPENSE" | "TRANSFER",
  };
};

export default function TransactionForm({
  onFormSubmit,
  onCancel,
  initialData,
}: TransactionFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData || {
      description: "",
      amount: undefined,
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
      type: TransactionType.EXPENSE,
      fromAccountId: "",
      toAccountId: "",
    },
  });

  const watchedTransactionType = watch("type");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResponse, accountsResponse] = await Promise.all([
          fetcher<Category[]>("/categories", { method: "GET" }),
          fetcher<BankAccount[]>("/bank-accounts", { method: "GET" }),
        ]);

        if (categoriesResponse.ok && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
        if (accountsResponse.ok && accountsResponse.data) {
          setAccounts(accountsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const processSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    const finalData = { ...data };

    if (data.type === TransactionType.INCOME) {
      delete (finalData as any).fromAccountId;
    } else if (data.type === TransactionType.EXPENSE) {
      delete (finalData as any).toAccountId;
    }

    const requestData = mapFormDataToRequest(finalData);

    await onFormSubmit(requestData as any);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <FormInput
        type="text"
        placeholder="Descrição"
        {...register("description")}
        error={errors.description?.message}
      />

      <FormInput
        type="number"
        placeholder="Valor"
        step="0.01"
        {...register("amount", { valueAsNumber: true })}
        error={errors.amount?.message}
      />

      <FormInput
        placeholder="Data"
        type="date"
        {...register("date")}
        error={errors.date?.message}
      />

      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="categoryId-select"
          className="text-sm font-medium text-gray-700"
        >
          Categoria:
        </label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading || categories.length === 0}
            >
              <SelectTrigger
                className={`bg-white w-full ${
                  errors.categoryId ? "border-red-500" : ""
                }`}
                id="categoryId-select"
              >
                <SelectValue
                  placeholder={
                    isLoading ? "Carregando..." : "Selecione uma categoria"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.categoryId && (
          <p className="text-xs text-red-500 mt-1">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="transactionType-select"
          className="text-sm font-medium text-gray-700"
        >
          Tipo de transação:
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => field.onChange(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger
                className={`bg-white w-full ${
                  errors.type ? "border-red-500" : ""
                }`}
                id="transactionType-select"
              >
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TransactionTypeLabels).map(([key, label]) => {
                  return (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && (
          <p className="text-xs text-red-500 mt-1">{errors.type.message}</p>
        )}
      </div>

      {!isLoading && accounts.length === 0 && (
        <p className="text-sm text-orange-600 bg-orange-100 p-2 rounded-md">
          Nenhuma conta bancária cadastrada. Cadastre uma conta para prosseguir
          com transações.
        </p>
      )}

      {(!isLoading || accounts.length > 0) && (
        <InputsForAccountSelection
          transactionType={watchedTransactionType}
          control={control}
          errors={errors}
          accounts={accounts}
        />
      )}

      <div className="flex flex-row w-full justify-between mt-4 gap-3">
        <Button
          type="button"
          variant="outline"
          className="flex-1 text-lg"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="flex-1 font-bold text-lg bg-primary hover:bg-primary/90"
          disabled={
            isSubmitting ||
            isLoading ||
            (accounts.length === 0 && watchedTransactionType !== undefined)
          }
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
