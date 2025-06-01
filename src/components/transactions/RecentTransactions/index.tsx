"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcnui/table";
import { useEffect, useState } from "react";
import { Transaction } from "../TransactionsTable";
import { fetcher } from "@/lib/fetcher";
import { TransactionType } from "@/enums/TransactionType.enum";
import Link from "next/link";

interface TransactionResponseWithPagination {
  data: Transaction[];
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export default function RecentTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetcher<TransactionResponseWithPagination>(
          "/transactions",
          {
            method: "GET",
          }
        );

        if (response.ok && response.data)
          setTransactionsData(
            response.data.data.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="flex w-full justify-between items-baseline text-black">
        <h1 className="text-lg">Transações recentes</h1>
        <Link href="/transacoes" className="underline text-xs">
          Ver todos
        </Link>
      </div>
      <Table className="rounded-lg overflow-hidden">
        <TableHeader className="bg-primary rounded-t-lg overflow-hidden">
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                Carregando transações...
              </TableCell>
            </TableRow>
          ) : transactionsData && transactionsData.length > 0 ? (
            transactionsData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-bold">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell
                  className={`${
                    transaction.type === TransactionType.INCOME
                      ? "text-green-600"
                      : transaction.type === TransactionType.EXPENSE
                      ? "text-red-600"
                      : "text-orange-600"
                  } font-medium`}
                >
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center py-10">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
