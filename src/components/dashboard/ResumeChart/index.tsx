"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcnui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#61c0bf",
  },
} satisfies ChartConfig;

export default function ResumeChart() {
  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="flex justify-between">
          <div className="flex flex-col gap-0">
            <CardTitle className="font-light text-xs">Gastos no mês</CardTitle>
            <CardDescription className="font-bold text-lg text-light-secondary">
              R$ 249,67
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer className="bg-none" config={chartConfig}>
            <LineChart
              className="bg-none"
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
