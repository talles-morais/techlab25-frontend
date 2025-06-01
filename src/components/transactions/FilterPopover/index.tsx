"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/shadcnui/button";
import { Input } from "@/components/shadcnui/input";
import { Label } from "@/components/shadcnui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnui/select";
import {
  Category,
  Account,
  FilterValues,
} from "@/components/shared/types/searchAndFilterTypes";
import { fetcher } from "@/lib/fetcher";

// Unique value for "All Items" selection in dropdowns
const ALL_ITEMS_SELECT_VALUE = "__ALL__";

interface FilterPopoverContentProps {
  initialFilters: FilterValues;
  onApply: (filtersToApply: FilterValues) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function FilterPopoverContent({
  initialFilters,
  onApply,
  onClear,
  onClose,
}: FilterPopoverContentProps) {
  const [stagedFilters, setStagedFilters] =
    useState<FilterValues>(initialFilters);

  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setStagedFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      setFetchError(null);
      let errors: string[] = [];
      try {
        const [categoriesResponse, accountsResponse] = await Promise.all([
          fetcher<Category[]>("/categories"),
          fetcher<Account[]>("/bank-accounts"),
        ]);

        if (categoriesResponse.ok && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        if (accountsResponse.ok && accountsResponse.data) {
          setAccounts(accountsResponse.data);
        }

        if (errors.length > 0) {
          setFetchError(errors.join("; "));
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
        setFetchError("Erro ao carregar dados para filtros.");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (
    field: keyof FilterValues,
    value: string | undefined
  ) => {
    setStagedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyClick = () => {
    onApply(stagedFilters);
    onClose();
  };

  const handleClearClick = () => {
    onClear();
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filtros</h4>
        <p className="text-sm text-muted-foreground">
          Selecione os filtros desejados.
        </p>
      </div>

      {fetchError && (
        <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md">
          Erro: {fetchError}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <div>
          <Label htmlFor="popover-filter-category">Categoria</Label>
          <Select
            value={stagedFilters.categoryId || ALL_ITEMS_SELECT_VALUE}
            onValueChange={(value) =>
              handleFilterChange(
                "categoryId",
                value === ALL_ITEMS_SELECT_VALUE ? undefined : value
              )
            }
            disabled={isLoadingData}
          >
            <SelectTrigger id="popover-filter-category">
              <SelectValue
                placeholder={isLoadingData ? "Carregando..." : "Categorias"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SELECT_VALUE}>
                Todas as categorias
              </SelectItem>
              {!isLoadingData &&
                categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="popover-filter-account">Conta</Label>
          <Select
            value={stagedFilters.accountId || ALL_ITEMS_SELECT_VALUE}
            onValueChange={(value) =>
              handleFilterChange(
                "accountId",
                value === ALL_ITEMS_SELECT_VALUE ? undefined : value
              )
            }
            disabled={isLoadingData}
          >
            <SelectTrigger id="popover-filter-account">
              <SelectValue
                placeholder={isLoadingData ? "Carregando..." : "Contas"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_ITEMS_SELECT_VALUE}>
                Todas as contas
              </SelectItem>
              {!isLoadingData &&
                accounts.map((acc) => (
                  <SelectItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <Label htmlFor="popover-filter-start-date">Data Início</Label>
            <Input
              className="w-fit"
              id="popover-filter-start-date"
              type="date"
              value={stagedFilters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              disabled={isLoadingData && !!fetchError}
            />
          </div>
          <div>
            <Label htmlFor="popover-filter-end-date">Data Fim</Label>
            <Input
              className="w-fit"
              id="popover-filter-end-date"
              type="date"
              value={stagedFilters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              disabled={isLoadingData && !!fetchError}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <Button variant="ghost" size="sm" onClick={handleClearClick}>
          Limpar Filtros
        </Button>
        <Button
          size="sm"
          onClick={handleApplyClick}
          disabled={isLoadingData && !fetchError}
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
