import { ArrowDownZa, Funnel, Search, XCircle } from "lucide-react";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearAll: () => void;
  // TODO: Add props for filter values and handlers
  // TODO: Add props for sort values and handlers
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  onClearAll,
}: SearchAndFilterProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange("")
  }

  return (
    <section className="flex flex-col w-full gap-3">
      <div className="flex flex-1 items-center gap-2 bg-white text-md md:text-base rounded-lg border border-light-secondary py-2 px-3">
        <Search size={16} />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Pesquisar categoria"
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button onClick={handleClearSearch} className="text-gray-500 hover:text-gray-700">
            <XCircle size={18} />
          </button>
        )}
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
