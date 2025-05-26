import { Search } from "lucide-react";
import NewCategory from "../NewCategory";
import CategoryCard from "../CategoryCard";

export default function CategoryList() {
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
        <NewCategory />
      </header>

      <section className="flex flex-wrap gap-1">
        {categories.map((category) => (
          <CategoryCard
            key={category.categoryName}
            categoryName={category.categoryName}
            totalTransactionsThisMonth={category.totalTransactionsThisMonth}
          />
        ))}
      </section>
    </div>
  );
}

const categories: {
  categoryName: string;
  totalTransactionsThisMonth: number;
}[] = [
  {
    categoryName: "Alimentação",
    totalTransactionsThisMonth: 23,
  },
  {
    categoryName: "Eletrônicos",
    totalTransactionsThisMonth: 3,
  },
  {
    categoryName: "Casa",
    totalTransactionsThisMonth: 2,
  },
  {
    categoryName: "Lazer",
    totalTransactionsThisMonth: 8,
  },
];
