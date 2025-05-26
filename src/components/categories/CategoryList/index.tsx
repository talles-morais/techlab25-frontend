"use client";
import { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import NewCategory from "../NewCategory";
import CategoryCard from "../CategoryCard";
import { fetcher } from "@/lib/fetcher";

interface Category {
  id: string;
  name: string;
  iconName: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

   const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetcher<Category[]>("/categories", {
        method: "GET",
      });
      setCategories(response);
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

  return (
    <div className="flex flex-col gap-3">
      <header className="flex gap-1.5 w-full justify-between">
        <form className="flex flex-1 items-center gap-2 bg-white text-xs rounded-lg border border-light-secondary py-1 px-2">
          <Search size={16} />
          <input
            className="w-full focus:outline-none"
            type="text"
            placeholder="Pesquisar categoria"
          />
        </form>
        <NewCategory dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}/>
      </header>

      <section className="flex flex-wrap gap-1 items-center justify-center min-h-[100px]">
        {loading ? (
          <Loader2 className="animate-spin text-gray-500" size={24} />
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              categoryName={category.name}
              totalTransactionsThisMonth={12}
              iconName={category.iconName}
            />
          ))
        ) : (
          <span>Sem categorias disponíveis, adicione uma nova!</span>
        )}
      </section>
    </div>
  );
}
