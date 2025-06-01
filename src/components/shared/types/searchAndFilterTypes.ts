// src/components/shared/search-and-filter-types.ts
export interface Category {
  id: string;
  name: string;
}
export interface Account {
  id: string;
  name: string;
}

export interface FilterValues {
  categoryId?: string;
  accountId?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
}

export interface SortValues {
  by?: "date" | "amount";
  order?: "asc" | "desc";
}

export const defaultFiltersData: FilterValues = {
  categoryId: undefined,
  accountId: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const defaultSortData: SortValues = {
  by: undefined,
  order: undefined,
};