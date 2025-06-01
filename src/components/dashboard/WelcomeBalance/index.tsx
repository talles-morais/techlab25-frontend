"use client";
import { fetcher } from "@/lib/fetcher";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function WelcomeBalance() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await fetcher<number>("/bank-accounts/balance", {
          method: "GET",
        });

        if (response.ok && response.data) setTotalBalance(response.data);
      } catch (error) {
        console.error("Error fetching total balance: ", error);
      }
    };

    fetchTotalBalance();
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      <h1>
        Olá, <span className="font-bold">Talles Alves!</span>
      </h1>

      {/*  balance */}
      <div className="flex flex-col items-center">
        <span className="text-sm">Saldo total</span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-3xl flex items-center gap-2"
        >
          {showBalance ? (
            <>
              <span className="font-bold">
                R${" "}
                {totalBalance.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <EyeOff size={16} />
            </>
          ) : (
            <>
              <span className="font-bold">
                R${" "}
                {"••••••••"}
              </span>
              <EyeOff size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
