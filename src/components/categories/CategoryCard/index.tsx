import { Activity } from "lucide-react";

interface CategoryCardProps {
  categoryName: string;
  totalTransactionsThisMonth: number;
}

export default function CategoryCard({
  categoryName,
  totalTransactionsThisMonth,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      className="flex flex-col gap-1 flex-1 basis-32 max-w-[160px] items-start border border-primary rounded-lg bg-white p-2 min-w-32 hover:scale-105 transition-all"
    >
      <Activity size={40} />
      <span className="font-semibold text-sm">{categoryName}</span>
      <span className="text-xs text-start">
        {totalTransactionsThisMonth} transações este mês
      </span>
    </button>
  );
}
