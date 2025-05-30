"use client";
import SearchAndFilter from "@/components/transactions/SearchAndFilter";
import TransactionsTable, {
  Transaction,
} from "@/components/transactions/TransactionsTable";
import { fetcher } from "@/lib/fetcher";
import { useCallback, useEffect, useMemo, useState } from "react";

interface TransactionResponseWithPagination {
  data: Transaction[];
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export default function TransacoesPage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[] | null>(
    null
  );
  const [displayedTransactions, setDisplayedTransactions] = useState<
    Transaction[]
  >([]);

  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const fetchController = async () => {
      if (isClientSideProcessingActive) {
        // Client-side mode: ensure allTransactions are loaded
        if (!allTransactions && !isLoadingAll) {
          setIsLoading(true); 
          setIsLoadingAll(true);
          try {
            const response = await fetcher<Transaction[]>("/transactions/all", { method: "GET" });
            setAllTransactions(response.data || []);
          } catch (error) {
            console.error("Failed to fetch all transactions:", error);
            setAllTransactions([]); 
          } finally {
            setIsLoadingAll(false);
          }
        } 
      } else {
        // Server-side pagination mode
        setIsLoading(true);
        try {
          const response = await fetcher<TransactionResponseWithPagination>(
            `/transactions?page=${currentPage}&limit=${limit}`,
            { method: "GET" }
          );
          if (response && response.data) {
            setDisplayedTransactions(response.data.data || []);
            setTotalPages(response.data.totalPages);
            setHasNextPage(response.data.hasNext);
            setHasPreviousPage(response.data.hasPrevious);
          } else {
            setDisplayedTransactions([]);
            setTotalPages(1); setHasNextPage(false); setHasPreviousPage(false);
          }
        } catch (error) {
          console.error("Failed to fetch paginated transactions:", error);
          setDisplayedTransactions([]);
          setTotalPages(1); setHasNextPage(false); setHasPreviousPage(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchController();
  }, [isClientSideProcessingActive, allTransactions, isLoadingAll, currentPage, limit]);

  // Process transactions (search, filter, sort) when allTransactions and searchTerm change
  const processedTransactions = useMemo(() => {
    if(!isClientSideProcessingActive || !allTransactions) {
      return []
    }

    let filtered = [...allTransactions]

    if(searchTerm) {
      filtered = filtered.filter((transaction) => 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.fromAccount?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.toAccount?.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      )
    }

    return filtered;
  }, [allTransactions, searchTerm, isClientSideProcessingActive])

   useEffect(() => {
    if (isClientSideProcessingActive) {
      if (allTransactions) {
        // Display all results of the client-side processing (search/filter)
        setDisplayedTransactions(processedTransactions);
        
        // When search is active, pagination shows all results on "page 1"
        setTotalPages(processedTransactions.length > 0 ? 1 : 0); // 0 pages if no results, 1 page if results
        setCurrentPage(1); // Always go to page 1 of search results
        setHasNextPage(false);
        setHasPreviousPage(false);

        if (!isLoadingAll) {
          setIsLoading(false);
        }
      }
    }
  }, [processedTransactions, isClientSideProcessingActive, allTransactions, isLoadingAll]);

   const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.trim() !== "" && !isClientSideProcessingActive) {
        setIsClientSideProcessingActive(true);
    } else if (term.trim() === "" && isClientSideProcessingActive) {
        // revert to server-side pagination when search is cleared
        setIsClientSideProcessingActive(false);
    }
    setCurrentPage(1); // Reset to first page on new search
  }, [isClientSideProcessingActive]);

  const handleClearSearchAndFilters = useCallback(() => {
    setSearchTerm("");
    // TODO: Reset filter and sort states here
    setIsClientSideProcessingActive(false);
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
    <div className="flex flex-col w-full px-3 py-4 gap-3 items-end">
      <SearchAndFilter 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearAll={handleClearSearchAndFilters}    
      />

      <TransactionsTable 
        transactionsData={displayedTransactions}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        isLoading={isLoading || (isClientSideProcessingActive && isLoadingAll)}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
}
