import { fetcher } from "@/lib/fetcher";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  iconName: string;
}

interface CategoryCardProps {
  category: Category;
  onDelete: () => void
}

export default function CategoryCard({ category, onDelete }: CategoryCardProps) {
  const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Activity;

  async function handleDelete() {
    try {
      await fetcher(`/categories/${category.id}`, {
        method: "DELETE",
      });

      toast.success(`Categoria ${category.name} deletada com sucesso`);
      onDelete()
    } catch (error: any) {
      const message = error?.message || "Erro ao deletar a categoria";
      toast.error(message);
    }
  }

  return (
    <div className="relative flex flex-col gap-1 flex-1 basis-32 max-w-[160px] items-start border border-primary rounded-lg bg-white p-2 min-w-32 hover:scale-105 transition-all">
      <Icon size={40} />
      <span className="font-semibold text-sm">{category.name}</span>
      <span className="text-xs text-start">{12} transações este mês</span>

      <button
        type="button"
        onClick={handleDelete}
        className="text-red-800 absolute rounded-full p-1 right-2 top-2 hover:scale-105 hover:bg-gray-100"
      >
        <LucideIcons.Trash2 size={18} />
      </button>
    </div>
  );
}
