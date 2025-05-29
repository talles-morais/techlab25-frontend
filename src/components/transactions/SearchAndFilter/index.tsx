import { ArrowDownZa, Funnel, Search } from "lucide-react";

export default function SearchAndFilter() {
  return (
    <section className="flex flex-col w-full px-3 py-4 gap-3">
      <div className="flex flex-1 items-center gap-2 bg-white text-md md:text-base rounded-lg border border-light-secondary py-2 px-3">
        <Search size={16} />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Pesquisar categoria"
        />
      </div>

      <div className="flex justify-between">
        <button className="flex items-center gap-2 bg-white text-md md:text-base rounded-lg border border-light-secondary py-2 px-3 cursor-pointer hover:scale-105 transition-all">
          <span>Filtrar</span>
          <Funnel />
        </button>

        <button className="flex items-center gap-2 bg-white text-md md:text-base rounded-lg border border-light-secondary py-2 px-3 cursor-pointer hover:scale-105 transition-all">
          <span>Ordenar</span>
          <ArrowDownZa />
        </button>
      </div>
    </section>
  );
}
