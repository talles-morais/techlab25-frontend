import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/shadcnui/table";
import NewTransaction from "../NewTransaction";
import { TableFooter } from "@mui/material";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcnui/pagination";

export default function TransactionsTable() {
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
              <TableHead>Conta</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Conta de origem</TableHead>
              <TableHead>Conta de destino</TableHead>
              <TableHead>Cartão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.map((transaction) => (
              <TableRow key={transaction.descricao}>
                <TableCell className="font-medium">
                  {transaction.descricao}
                </TableCell>
                <TableCell>{transaction.data}</TableCell>
                <TableCell>{transaction.tipo}</TableCell>
                <TableCell>
                  {transaction.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>{transaction.conta}</TableCell>
                <TableCell>{transaction.categoria}</TableCell>
                <TableCell>{transaction.contaOrigem}</TableCell>
                <TableCell>{transaction.contaDestino}</TableCell>
                <TableCell>{transaction.cartao}</TableCell>
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

const mockTransactions = [
  {
    descricao: "Compra supermercado",
    data: "2025-05-28",
    tipo: "Despesa",
    valor: 150.75,
    conta: "Conta Corrente",
    categoria: "Alimentação",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "Nubank",
  },
  {
    descricao: "Salário",
    data: "2025-05-25",
    tipo: "Receita",
    valor: 3500.0,
    conta: "Conta Corrente",
    categoria: "Salário",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "-",
  },
  {
    descricao: "Transferência para poupança",
    data: "2025-05-20",
    tipo: "Transferência",
    valor: 500.0,
    conta: "Conta Corrente",
    categoria: "Transferência",
    contaOrigem: "Conta Corrente",
    contaDestino: "Poupança",
    cartao: "-",
  },
  {
    descricao: "Pagamento cartão",
    data: "2025-05-18",
    tipo: "Despesa",
    valor: 800.0,
    conta: "Conta Corrente",
    categoria: "Pagamentos",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "Itaú",
  },
  {
    descricao: "Restaurante",
    data: "2025-05-15",
    tipo: "Despesa",
    valor: 120.0,
    conta: "Conta Corrente",
    categoria: "Alimentação",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "Nubank",
  },
  {
    descricao: "Freelance",
    data: "2025-05-12",
    tipo: "Receita",
    valor: 900.0,
    conta: "Conta Corrente",
    categoria: "Serviços",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "-",
  },
  {
    descricao: "Internet",
    data: "2025-05-10",
    tipo: "Despesa",
    valor: 99.9,
    conta: "Conta Corrente",
    categoria: "Utilidades",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "-",
  },
  {
    descricao: "Transferência recebida",
    data: "2025-05-08",
    tipo: "Receita",
    valor: 200.0,
    conta: "Conta Corrente",
    categoria: "Transferência",
    contaOrigem: "Poupança",
    contaDestino: "Conta Corrente",
    cartao: "-",
  },
  {
    descricao: "Farmácia",
    data: "2025-05-05",
    tipo: "Despesa",
    valor: 60.0,
    conta: "Conta Corrente",
    categoria: "Saúde",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "Nubank",
  },
  {
    descricao: "Cinema",
    data: "2025-05-02",
    tipo: "Despesa",
    valor: 45.0,
    conta: "Conta Corrente",
    categoria: "Lazer",
    contaOrigem: "-",
    contaDestino: "-",
    cartao: "-",
  },
];
