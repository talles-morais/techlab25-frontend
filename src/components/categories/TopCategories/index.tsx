"use client";

import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/shadcnui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#4285F4" },   // Azul Google Chrome
  { browser: "safari", visitors: 200, fill: "#FF9500" },   // Laranja Safari
  { browser: "firefox", visitors: 187, fill: "#FF7139" },  // Laranja Firefox
  { browser: "edge", visitors: 173, fill: "#0078D7" },     // Azul Edge
  { browser: "other", visitors: 90, fill: "#888888" },     // Cinza Other
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#4285F4",
  },
  safari: {
    label: "Safari",
    color: "#FF9500",
  },
  firefox: {
    label: "Firefox",
    color: "#FF7139",
  },
  edge: {
    label: "Edge",
    color: "#0078D7",
  },
  other: {
    label: "Other",
    color: "#888888",
  },
} satisfies ChartConfig;

export default function TopCategories() {
  return (
    <Card className="flex flex-col shadow-none border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
