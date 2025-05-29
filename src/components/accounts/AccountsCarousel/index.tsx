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
  BankAccountTypeValues,
} from "@/enums/BankAccountType.enum";

import AccountCard from "../AccountCard";

interface BankAccount {
  id: string;
  name: string;
  type: BankAccountType;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export default function AccountsCarousel() {
  const [accounts, setAccounts] = useState<BankAccount[]>();

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetcher<BankAccount[]>("/bank-accounts", {
          method: "GET",
        });

        if (response) setAccounts(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAccounts();
  }, []);

  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {accounts?.map((account) => (
            <CarouselItem key={account.id} className="basis-3/5 max-w-[160px]">
              <AccountCard
                bankName={account.name}
                accountType={BankAccountTypeValues[account.type]}
                balance={account.balance}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
