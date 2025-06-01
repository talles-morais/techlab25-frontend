"use client";
import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import NewCategory from "../NewCategory";
import CategoryCard from "../CategoryCard";
import { fetcher } from "@/lib/fetcher";
import { toast, Toaster } from "sonner";
import EditCategory from "../EditCategory";

interface Category {
  id: string;
  name: string;
  iconName: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetcher<Category[]>("/categories", {
        method: "GET",
      });

      if (response.data) setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Recarregar categorias quando o diálogo fechar (de true para false)
  useEffect(() => {
    if (dialogOpen === false) {
      fetchCategories();
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (editDialogOpen === false) {
      setSelectedCategory(null);
      fetchCategories();
    }
  }, [editDialogOpen]);

  const handleEditSubmit = async (updatedCategory: {
    name: string;
    iconName: string | null;
  }) => {
    if (!selectedCategory) return;

    try {
      await fetcher(`/categories/${selectedCategory.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedCategory),
      });
      toast.success(`Categoria atualizada com sucesso`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <header className="flex gap-1.5 w-full justify-between">
        <form className="flex flex-1 items-center gap-2 bg-white text-xs md:text-base rounded-lg border border-light-secondary py-1 px-2">
          <Search size={16} />
          <input
            className="w-full focus:outline-none"
            type="text"
            placeholder="Pesquisar categoria"
          />
        </form>
        <NewCategory dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      </header>

      <section className="flex flex-wrap gap-1 items-center justify-start min-h-[100px]">
        {loading ? (
          <Loader2 className="animate-spin text-gray-500" size={24} />
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onDelete={fetchCategories}
              onEdit={(category) => {
                setSelectedCategory(category);
                setEditDialogOpen(true);
              }}
            />
          ))
        ) : (
          <span>Sem categorias disponíveis, adicione uma nova!</span>
        )}
      </section>

      <EditCategory
        dialogOpen={editDialogOpen}
        setDialogOpen={setEditDialogOpen}
        initialIconName={selectedCategory?.iconName ?? null}
        initialName={selectedCategory?.name ?? ""}
        onSubmit={handleEditSubmit}
      />
      <Toaster richColors />
    </div>
  );
}
