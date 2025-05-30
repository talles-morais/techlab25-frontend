import ConfirmAction from "@/components/shared/ConfirmAction";
import { fetcher } from "@/lib/fetcher";
import * as LucideIcons from "lucide-react";
import { toast } from "sonner";

export interface Category {
  id: string;
  name: string;
  iconName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CategoryCardProps {
  category: Category;
  onDelete: () => void;
  onEdit: (category: Category) => void;
}

export default function CategoryCard({
  category,
  onDelete,
  onEdit,
}: CategoryCardProps) {
  const Icon = (LucideIcons as any)[category.iconName] || LucideIcons.Activity;

  async function handleDelete() {
    try {
      await fetcher(`/categories/${category.id}`, {
        method: "DELETE",
      });

      toast.success(`Categoria ${category.name} deletada com sucesso`);
      onDelete();
    } catch (error: any) {
      const message = error?.message || "Erro ao deletar a categoria";
      toast.error(message);
    }
  }

  return (
    <div
      onClick={() => onEdit(category)}
      className="relative flex flex-col gap-1 flex-1 basis-32 max-w-[160px] items-start border border-primary rounded-lg bg-white p-2 min-w-32 hover:scale-105 transition-all"
    >
      <Icon size={40} />
      <span className="font-semibold text-sm md:text-base">
        {category.name}
      </span>
      <span className="text-xs md:text-md text-start">
        {12} transações este mês
      </span>

      <ConfirmAction
        title="Deletar categoria"
        description="Esta ação é irreversível"
        onConfirm={handleDelete}
      >
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="text-red-800 absolute rounded-full p-1 right-2 top-2 hover:scale-105 hover:bg-gray-100"
        >
          <LucideIcons.Trash2 size={18} />
        </button>
      </ConfirmAction>
    </div>
  );
}
