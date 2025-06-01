"use client";

import React, { useMemo, useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcnui/chart";
import { Button } from "@/components/shadcnui/button";
import { fetcher } from "@/lib/fetcher";

interface Transaction {
  id: string;
  date: Date | string;
  amount: number;
  type: "income" | "expense";
  description?: string;
  category?: { name: string };
}

const chartConfig = {
  gastos: {
    label: "Gastos",
    color: "#61c0bf",
  },
} satisfies ChartConfig;

type TimePeriodFilter = "lastWeek" | "lastMonth" | "last6Months";

const formatDateKey = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export default function ResumeChart() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] =
    useState<TimePeriodFilter>("lastMonth");

  useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetcher<Transaction[]>("/transactions/all");

        if (response.ok && response.data) {
          const parsedTransactions = response.data.map(
            (apiTransaction: any) => {
              let transactionType: "income" | "expense" = "income";
              if (apiTransaction.type === 1) {
                transactionType = "expense";
              } else if (apiTransaction.type === 0) {
                transactionType = "income";
              } else {
                console.warn(
                  "Tipo de transação desconhecido:",
                  apiTransaction.type
                );
              }

              return {
                ...apiTransaction,
                date: new Date(apiTransaction.date),
                type: transactionType,
              };
            }
          );
          setTransactionsData(parsedTransactions as Transaction[]);
        }
      } catch (error) {
        console.error("Error fetching transactions for chart:", error);
        setFetchError("Erro ao carregar dados das transações.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const { chartDataForDisplay, totalGastosDisplay, chartTitleDisplay } =
    useMemo(() => {
      const now = new Date();
      let startDate: Date;
      let endDate: Date = new Date(now);
      endDate.setHours(23, 59, 59, 999);

      let newChartTitle = "Gastos";
      let dataPoints = new Map<string, number>();
      let dateFormatForLabel: Intl.DateTimeFormatOptions = {};
      let periodType: "day" | "month" = "day";

      const expenses = transactionsData.filter((t) => t.type === "expense");

      switch (activeFilter) {
        case "lastWeek":
          newChartTitle = "Gastos na Última Semana";
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 6);
          startDate.setHours(0, 0, 0, 0);
          dateFormatForLabel = { weekday: "short" };
          periodType = "day";
          for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            dataPoints.set(formatDateKey(day), 0);
          }
          break;
        case "lastMonth":
          newChartTitle = "Gastos no Mês Atual";
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          startDate.setHours(0, 0, 0, 0);
          dateFormatForLabel = { day: "2-digit" };
          periodType = "day";
          const tempDate = new Date(startDate);
          while (tempDate <= endDate) {
            dataPoints.set(formatDateKey(tempDate), 0);
            if (tempDate.getMonth() !== startDate.getMonth() && tempDate > now)
              break;
            tempDate.setDate(tempDate.getDate() + 1);
          }
          break;
        case "last6Months":
          newChartTitle = "Gastos nos Últimos 6 Meses";
          startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
          startDate.setHours(0, 0, 0, 0);
          dateFormatForLabel = { month: "short" };
          periodType = "month";
          for (let i = 0; i < 6; i++) {
            const monthDate = new Date(
              now.getFullYear(),
              now.getMonth() - 5 + i,
              1
            );
            dataPoints.set(
              `${monthDate.getFullYear()}-${String(
                monthDate.getMonth() + 1
              ).padStart(2, "0")}`,
              0
            );
          }
          break;
      }

      let currentTotal = 0;
      expenses.forEach((transaction) => {
        if (transaction.date >= startDate && transaction.date <= endDate) {
          currentTotal += transaction.amount;
          let key: string;
          if (periodType === "day") {
            key = formatDateKey(
              transaction.date instanceof Date
                ? transaction.date
                : new Date(transaction.date)
            );
          } else {
            const dateObj =
              transaction.date instanceof Date
                ? transaction.date
                : new Date(transaction.date);
            key = `${dateObj.getFullYear()}-${String(
              dateObj.getMonth() + 1
            ).padStart(2, "0")}`;
          }
          if (dataPoints.has(key)) {
            dataPoints.set(
              key,
              (dataPoints.get(key) || 0) + transaction.amount
            );
          }
        }
      });

      const finalChartData = Array.from(dataPoints.entries())
        .map(([periodKey, amount]) => ({
          period: periodKey,
          label:
            periodType === "month"
              ? new Date(
                  Number(periodKey.substring(0, 4)),
                  Number(periodKey.substring(5, 7)) - 1,
                  1
                ).toLocaleDateString("pt-BR", dateFormatForLabel)
              : new Date(periodKey + "T00:00:00Z").toLocaleDateString("pt-BR", {
                  ...dateFormatForLabel,
                  timeZone: "UTC",
                }),
          gastos: amount,
        }))
        .sort((a, b) => {
          const dateA =
            periodType === "month"
              ? new Date(a.period + "-01T00:00:00Z")
              : new Date(a.period + "T00:00:00Z");
          const dateB =
            periodType === "month"
              ? new Date(b.period + "-01T00:00:00Z")
              : new Date(b.period + "T00:00:00Z");
          return dateA.getTime() - dateB.getTime();
        });

      return {
        chartDataForDisplay: finalChartData,
        totalGastosDisplay: currentTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        chartTitleDisplay: newChartTitle,
      };
    }, [transactionsData, activeFilter]);

  if (isLoading) {
    return (
      <Card className="border-none shadow-none w-full">
        <CardHeader className="pb-2">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col gap-0">
              <CardTitle className="font-light text-xs">
                Carregando...
              </CardTitle>
              <CardDescription className="font-bold text-lg text-foreground">
                --,--
              </CardDescription>
            </div>
            <div className="flex gap-1 invisible">
              <Button size="sm" className="text-xs px-2 h-7">
                Semana
              </Button>
              <Button size="sm" className="text-xs px-2 h-7">
                Mês
              </Button>
              <Button size="sm" className="text-xs px-2 h-7">
                6 Meses
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[150px] flex items-center justify-center text-muted-foreground">
            Carregando dados do gráfico...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (fetchError) {
    return (
      <Card className="border-none shadow-none w-full">
        <CardHeader className="pb-2">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col gap-0">
              <CardTitle className="font-light text-xs text-red-500">
                Erro ao carregar dados
              </CardTitle>
              <CardDescription className="font-bold text-lg text-foreground">
                --,--
              </CardDescription>
            </div>
            <div className="flex gap-1"></div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[150px] flex items-center justify-center text-red-500">
            {fetchError}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2">
          <div className="flex flex-row justify-between items-start">
            <div className="flex flex-col gap-0">
              <CardTitle className="font-light text-xs">
                {chartTitleDisplay}
              </CardTitle>
              <CardDescription className="font-bold text-lg text-foreground">
                {totalGastosDisplay}
              </CardDescription>
            </div>
            <div className="flex gap-1">
              {(
                ["lastWeek", "lastMonth", "last6Months"] as TimePeriodFilter[]
              ).map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  className="text-xs px-2 h-7"
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "lastWeek" && "Semana"}
                  {filter === "lastMonth" && "Mês"}
                  {filter === "last6Months" && "6M"}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {chartDataForDisplay.length > 0 ? (
            <ChartContainer
              className="bg-none h-[150px] w-full"
              config={chartConfig}
            >
              <LineChart
                accessibilityLayer
                data={chartDataForDisplay}
                margin={{
                  top: 5,
                  left: -15,
                  right: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={"preserveStartEnd"}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    if (value === 0) return "R$0";
                    if (Math.abs(value) >= 1000) return `R$${value / 1000}k`;
                    return `R$${value}`;
                  }}
                  width={45}
                  domain={["auto", "auto"]}
                />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent indicator="line" hideLabel />}
                />
                <Line
                  dataKey="gastos"
                  type="monotone"
                  stroke="var(--color-gastos)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          ) : (
            <div className="h-[150px] flex items-center justify-center text-muted-foreground">
              Sem dados de gastos para o período selecionado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
