import SearchAndFilter from "@/components/transactions/SearchAndFilter";
import TransactionsTable from "@/components/transactions/TransactionsTable";

export default function TransacoesPage() {
  return (
    <div className="flex flex-col w-full px-3 py-4 gap-3 items-end">
      <SearchAndFilter />

      <TransactionsTable />
    </div>
  )
}