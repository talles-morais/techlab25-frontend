import CategoryList from "@/components/categories/CategoryList";
import TopCategories from "@/components/categories/TopCategories";

export default function CategoriasPage() {
  return (
    <div className="w-full px-3 py-4">
      <main className="flex flex-col gap-5 font-work-sans px-3 py-4 bg-light-background rounded-lg md:container md:mx-auto">
        <h1>Maiores gastos</h1>
        <TopCategories />

        <section>
          <CategoryList />
        </section>
      </main>
    </div>
  );
}
