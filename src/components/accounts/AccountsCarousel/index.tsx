"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcnui/carousel";
import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import {
  BankAccountType,
  BankAccountTypeLabels,
} from "@/enums/BankAccountType.enum";

import AccountCard from "../AccountCard";
import NewAccountDialog from "../NewAccountDialog";
import { Toaster } from "sonner";

export interface BankAccount {
  id: string;
  name: string;
  type: BankAccountType;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export default function AccountsCarousel() {
  const [accounts, setAccounts] = useState<BankAccount[]>();

  async function fetchAccounts() {
    try {
      const response = await fetcher<BankAccount[]>("/bank-accounts", {
        method: "GET",
      });

      if (response) {
        setAccounts(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="flex flex-col items-end gap-4 w-full">
      <NewAccountDialog onCreate={fetchAccounts} />

      <Carousel className="w-full">
        <CarouselContent>
          {accounts?.map((account) => (
            <CarouselItem key={account.id} className="basis-3/5 max-w-[160px]">
              <AccountCard
                bankName={account.name}
                accountType={BankAccountTypeLabels[account.type]}
                balance={account.balance}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Toaster richColors/>
    </div>
  );
}
