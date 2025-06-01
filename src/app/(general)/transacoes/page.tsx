"use client";
import SearchAndFilter from "@/components/transactions/SearchAndFilter";
import TransactionsTable, {
  Transaction,
} from "@/components/transactions/TransactionsTable";
import { fetcher } from "@/lib/fetcher";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FilterValues,
  SortValues,
  defaultFiltersData,
} from "@/components/shared/types/searchAndFilterTypes"; 

interface TransactionResponseWithPagination {
  data: Transaction[];
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

const defaultSortOptions: SortValues = { by: "date", order: "desc" };

export default function TransacoesPage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[] | null>(
    null
  );
  const [displayedTransactions, setDisplayedTransactions] = useState<
    Transaction[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] =
    useState<FilterValues>(defaultFiltersData);
  const [activeSort, setActiveSort] = useState<SortValues>(defaultSortOptions);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(false); 

  const [isClientSideProcessingActive, setIsClientSideProcessingActive] =
    useState(false);

  const limitOptions = [1, 5, 10, 25, 50];

  // Determine if client-side processing should be active
  useEffect(() => {
    const searchIsActive = searchTerm.trim() !== "";
    const filtersAreActive = Object.values(activeFilters).some(
      (value) => value !== undefined && value !== ""
    );
    const shouldBeClientSide = searchIsActive || filtersAreActive;

    if (shouldBeClientSide !== isClientSideProcessingActive) {
      setIsClientSideProcessingActive(shouldBeClientSide);
    }
  }, [searchTerm, activeFilters, isClientSideProcessingActive]);

  const fetchController = useCallback(async () => {
    if (isClientSideProcessingActive) {
      // ... (lógica para client-side processing permanece a mesma) ...
      if (!allTransactions && !isLoadingAll) {
        setIsLoading(true);
        setIsLoadingAll(true);
        try {
          const response = await fetcher<Transaction[]>("/transactions/all", {
            method: "GET",
          });
          setAllTransactions(response.data || []);
        } catch (error) {
          console.error("Failed to fetch all transactions:", error);
          setAllTransactions([]);
        } finally {
          setIsLoadingAll(false);
        }
      } else if (allTransactions && !isLoadingAll) {
        setIsLoading(true);
      }
    } else {
      // Server-side pagination mode
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      if (activeSort.by && activeSort.order) {
        queryParams.append("sortBy", activeSort.by);
        queryParams.append("sortOrder", activeSort.order);
      }

      try {
        const response = await fetcher<TransactionResponseWithPagination>(
          `/transactions?${queryParams.toString()}`,
          { method: "GET" }
        );
        if (response && response.data) {
          let newTransactions = response.data.data || [];

          if (activeSort.by && activeSort.order) {
            newTransactions.sort((a, b) => {
              let valA, valB;
              if (activeSort.by === "date") {
                valA = new Date(a.date).getTime();
                valB = new Date(b.date).getTime();
              } else {
                valA = a.amount;
                valB = b.amount;
              }
              return activeSort.order === "asc" ? valA - valB : valB - valA;
            });
          }

          setDisplayedTransactions(newTransactions);
          setTotalPages(response.data.totalPages);
          setHasNextPage(response.data.hasNext);
          setHasPreviousPage(response.data.hasPrevious);
        } else {
          setDisplayedTransactions([]);
          setTotalPages(1);
          setHasNextPage(false);
          setHasPreviousPage(false);
        }
      } catch (error) {
        console.error("Failed to fetch paginated transactions:", error);
        setDisplayedTransactions([]);
        setTotalPages(1);
        setHasNextPage(false);
        setHasPreviousPage(false);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    isClientSideProcessingActive,
    allTransactions,
    isLoadingAll,
    currentPage,
    limit,
    activeSort,
  ]);

  useEffect(() => {
    fetchController();
  }, [fetchController]);

  const processedTransactions = useMemo(() => {
    if (!isClientSideProcessingActive || !allTransactions) {
      return [];
    }

    let filtered = [...allTransactions];

    // 1. Search
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(lowerSearchTerm) ||
          transaction.category?.name.toLowerCase().includes(lowerSearchTerm) ||
          transaction.fromAccount?.name
            .toLowerCase()
            .includes(lowerSearchTerm) ||
          transaction.toAccount?.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // 2. Filters
    if (activeFilters.categoryId) {
      filtered = filtered.filter(
        (t) => t.category?.id === activeFilters.categoryId
      );
    }
    if (activeFilters.accountId) {
      filtered = filtered.filter(
        (t) =>
          t.fromAccount?.id === activeFilters.accountId ||
          t.toAccount?.id === activeFilters.accountId
      );
    }
    if (activeFilters.startDate) {
      const startDate = new Date(activeFilters.startDate);
      // Adjust start date to ensure it's the beginning of the day in local timezone
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
    }
    if (activeFilters.endDate) {
      const endDate = new Date(activeFilters.endDate);
      // Adjust end date to ensure it's the end of the day for comparison
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => new Date(t.date) <= endDate);
    }

    // 3. Sorting
    if (activeSort.by && activeSort.order) {
      filtered.sort((a, b) => {
        let valA, valB;
        if (activeSort.by === "date") {
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
        } else {
          valA = a.amount;
          valB = b.amount;
        }

        return activeSort.order === "asc" ? valA - valB : valB - valA;
      });
    }

    return filtered;
  }, [
    allTransactions,
    searchTerm,
    activeFilters,
    activeSort,
    isClientSideProcessingActive,
  ]);

  useEffect(() => {
    if (isClientSideProcessingActive) {
      if (allTransactions && !isLoadingAll) {
        setDisplayedTransactions(processedTransactions);
        // In client-side mode, show all results on one page
        setTotalPages(1);
        setCurrentPage(1);
        setHasNextPage(false);
        setHasPreviousPage(false);
        setIsLoading(false);
      } else if (isLoadingAll) {
        setIsLoading(true);
      }
    }
  }, [
    processedTransactions,
    isClientSideProcessingActive,
    allTransactions,
    isLoadingAll,
  ]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleApplyFilters = useCallback((filtersToApply: FilterValues) => {
    setActiveFilters(filtersToApply);
    setCurrentPage(1);
  }, []);

  const handleApplySort = useCallback((sortToApply: SortValues) => {
    setActiveSort(sortToApply);
  }, []);

  const handleClearSearchAndFilters = useCallback(() => {
    setSearchTerm("");
    setActiveFilters(defaultFiltersData);
    setActiveSort(defaultSortOptions);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  }, []);

  return (
    <div className="flex flex-col w-full px-3 py-4 gap-3">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchChange}
        activeFilters={activeFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearSearchAndFilters}
        activeSort={activeSort}
        onApplySort={handleApplySort}
      />

      <TransactionsTable
        transactionsData={displayedTransactions}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        refreshKey={fetchController}
      />
    </div>
  );
}
