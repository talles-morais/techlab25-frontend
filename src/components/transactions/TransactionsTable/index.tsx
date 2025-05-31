"use client";
import React from "react";
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
import { BankAccount } from "@/components/accounts/AccountsCarousel";
import {
  TransactionType,
  TransactionTypeLabels,
} from "@/enums/TransactionType.enum";
import { Category } from "@/components/categories/CategoryCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnui/select";
import { Toaster } from "sonner";

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

interface TransactionsTableProps {
  transactionsData: Transaction[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  limitOptions: number[];
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function TransactionsTable({
  transactionsData,
  isLoading,
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  limit,
  limitOptions,
  onPageChange,
  onLimitChange,
}: TransactionsTableProps) {
  const handleInternalPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const handleInternalLimitChange = (newLimitString: string) => {
    onLimitChange(parseInt(newLimitString));
  };

  return (
    <section className="flex flex-col gap-3 w-full items-end">
      <div className="flex justify-between w-full items-center">
        <div className="flex items-center gap-2">
          <label
            htmlFor="limit-select"
            className="text-sm font-medium text-gray-700"
          >
            Itens por página:
          </label>

          <Select
            value={limit.toString()}
            onValueChange={handleInternalLimitChange}
          >
            <SelectTrigger id="limit-select" className="w-[80px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <NewTransaction />
      </div>

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
                  <TableCell>
                    {TransactionTypeLabels[transaction.type]}
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
                  <TableCell>{transaction.category?.name || "-"}</TableCell>
                  <TableCell>{transaction.fromAccount?.name || "-"}</TableCell>
                  <TableCell>{transaction.toAccount?.name || "-"}</TableCell>
                  <TableCell>{"Visa"}</TableCell>
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

        {totalPages >= 1 && !isLoading && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPreviousPage) {
                      handleInternalPageChange(currentPage - 1);
                    }
                  }}
                  aria-disabled={!hasPreviousPage}
                  className={
                    !hasPreviousPage ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <RenderPaginationItems
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handleInternalPageChange}
              />
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNextPage) {
                      handleInternalPageChange(currentPage + 1);
                    }
                  }}
                  aria-disabled={!hasNextPage}
                  className={
                    !hasNextPage ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <Toaster richColors/>
    </section>
  );
}

const RenderPaginationItems = ({
  totalPages,
  currentPage,
  handlePageChange,
}: {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}) => {
  const items = [];
  const maxPagesToShow = 1;
  const ellipsis = (
    <PaginationItem key="ellipsis">
      <PaginationEllipsis />
    </PaginationItem>
  );

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    // Always show first page
    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(1);
          }}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      items.push(React.cloneElement(ellipsis, { key: "start-ellipsis" }));
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(React.cloneElement(ellipsis, { key: "end-ellipsis" }));
    }

    // Always show last page
    items.push(
      <PaginationItem key={totalPages}>
        <PaginationLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(totalPages);
          }}
          isActive={currentPage === totalPages}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    );
  }
  return items;
};
