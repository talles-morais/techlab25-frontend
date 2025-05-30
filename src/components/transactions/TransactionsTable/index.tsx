"use client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/shadcnui/table";
import NewTransaction from "../NewTransaction";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcnui/pagination";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { BankAccount } from "@/components/accounts/AccountsCarousel";
import {
  TransactionType,
  TransactionTypeLabels,
} from "@/enums/TransactionType.enum";
import { Category } from "@/components/categories/CategoryCard";

export interface Transaction {
  id: string;
  fromAccount?: BankAccount;
  toAccount?: BankAccount;
  amount: number;
  description: string;
  date: Date;
  type: TransactionType;
  category: Category;
}

interface TransactionResponseWithPagination {
  data: Transaction[];
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetcher<TransactionResponseWithPagination>(
          "/transactions",
          {
            method: "GET",
          }
        );

        if (response.data?.data) setTransactions(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <section className="flex flex-col gap-3 w-full items-end">
      <NewTransaction />

      <div className="rounded-lg border flex flex-col w-full">
        <Table className="rounded-lg overflow-hidden">
          <TableHeader className="bg-primary rounded-t-lg overflow-hidden">
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Conta de origem</TableHead>
              <TableHead>Conta de destino</TableHead>
              <TableHead>Cartão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-bold">
                  {transaction.description}
                </TableCell>
                <TableCell>
                  {transaction.date
                    ? new Date(transaction.date).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell>{TransactionTypeLabels[transaction.type]}</TableCell>
                <TableCell
                  className={`${
                    transaction.type === 0
                      ? "text-green-600"
                      : transaction.type === 1
                      ? "text-red-600"
                      : "text-orange-600"
                  } font-medium`}
                >
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>{transaction.category.name}</TableCell>
                <TableCell>{transaction.fromAccount?.name || "-"}</TableCell>
                <TableCell>{transaction.toAccount?.name || "-"}</TableCell>
                <TableCell>{"Visa"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
