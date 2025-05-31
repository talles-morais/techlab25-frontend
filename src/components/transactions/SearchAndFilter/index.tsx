"use client";

import React, { useState } from "react";
import { ArrowDownZa, Funnel, Search, XCircle } from "lucide-react";

import { Button } from "@/components/shadcnui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcnui/popover";

import FilterPopoverContent from "../FilterPopover";
import SortPopoverContent from "../SortPopover";
import {
  FilterValues,
  SortValues,
} from "@/components/shared/types/searchAndFilterTypes"

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;

  activeFilters: FilterValues;
  onApplyFilters: (filtersToApply: FilterValues) => void;
  onClearFilters: () => void;

  activeSort: SortValues;
  onApplySort: (sortToApply: SortValues) => void;
}

export default function SearchAndFilter({
  searchTerm,
  onSearchTermChange,
  activeFilters,
  onApplyFilters,
  onClearFilters,
  activeSort,
  onApplySort,
}: SearchAndFilterProps) {
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onSearchTermChange(event.target.value);
  };

  const handleClearSearch = () => {
    onSearchTermChange("");
  };

  return (
    <section className="flex flex-col w-full gap-4 my-4">
      <div className="flex flex-1 items-center gap-2 bg-white text-md md:text-base rounded-lg border border-input py-2 px-3 shadow-sm">
        <Search size={20} className="text-muted-foreground" />
        <input
          className="w-full focus:outline-none bg-transparent placeholder:text-muted-foreground"
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-muted-foreground hover:text-foreground"
          >
            <XCircle size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        {/* Filter Popover */}
        <Popover open={isFilterPopoverOpen} onOpenChange={setIsFilterPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
            >
              <span>Filtrar</span>
              <Funnel size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit" side="bottom" align="start">
            <FilterPopoverContent
              initialFilters={activeFilters}
              onApply={onApplyFilters}
              onClear={onClearFilters}
              onClose={() => setIsFilterPopoverOpen(false)}
            />
          </PopoverContent>
        </Popover>

        {/* Sort Popover */}
        <Popover open={isSortPopoverOpen} onOpenChange={setIsSortPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
            >
              <span>Ordenar</span>
              <ArrowDownZa size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="bottom" align="end">
            <SortPopoverContent
              initialSort={activeSort}
              onApply={onApplySort}
              onClose={() => setIsSortPopoverOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
}