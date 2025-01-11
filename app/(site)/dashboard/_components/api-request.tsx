"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { date: "2024-05-01", desktop: 222, mobile: 1 },
  { date: "2024-05-02", desktop: 97, mobile: 1 },
  { date: "2024-05-03", desktop: 167, mobile: 1 },
  { date: "2024-05-04", desktop: 340, mobile: 2 },
  { date: "2024-05-05", desktop: 373, mobile: 2 },
  { date: "2024-05-06", desktop: 301, mobile: 0 },
  { date: "2024-05-07", desktop: 245, mobile: 1 },
  { date: "2024-05-08", desktop: 409, mobile: 0 },
  { date: "2024-05-09", desktop: 59, mobile: 1 },
  { date: "2024-05-10", desktop: 261, mobile: 1 },
  { date: "2024-05-11", desktop: 327, mobile: 0 },
  { date: "2024-05-12", desktop: 292, mobile: 0 },
  { date: "2024-05-13", desktop: 342, mobile: 0 },
  { date: "2024-05-14", desktop: 137, mobile: 2 },
  { date: "2024-05-15", desktop: 120, mobile: 1 },
  { date: "2024-05-16", desktop: 138, mobile: 0 },
  { date: "2024-05-17", desktop: 446, mobile: 0 },
  { date: "2024-05-18", desktop: 364, mobile: 0 },
  { date: "2024-05-19", desktop: 243, mobile: 1 },
  { date: "2024-05-20", desktop: 89, mobile: 0 },
  { date: "2024-05-21", desktop: 137, mobile: 2 },
  { date: "2024-05-22", desktop: 224, mobile: 1 },
  { date: "2024-05-23", desktop: 138, mobile: 2 },
  { date: "2024-05-24", desktop: 387, mobile: 2 },
  { date: "2024-05-25", desktop: 215, mobile: 2 },
  { date: "2024-05-26", desktop: 75, mobile: 1 },
  { date: "2024-05-27", desktop: 383, mobile: 0 },
  { date: "2024-05-28", desktop: 122, mobile: 0 },
  { date: "2024-05-29", desktop: 315, mobile: 2 },
  { date: "2024-05-30", desktop: 454, mobile: 0 },

  { date: "2024-06-01", desktop: 165, mobile: 0 },
  { date: "2024-06-02", desktop: 293, mobile: 0 },
  { date: "2024-06-03", desktop: 247, mobile: 1 },
  { date: "2024-06-04", desktop: 385, mobile: 4 },
  { date: "2024-06-05", desktop: 481, mobile: 0 },
  { date: "2024-06-06", desktop: 498, mobile: 0 },
  { date: "2024-06-07", desktop: 388, mobile: 0 },
  { date: "2024-06-08", desktop: 149, mobile: 0 },
  { date: "2024-06-09", desktop: 227, mobile: 1 },
  { date: "2024-06-10", desktop: 293, mobile: 0 },
  { date: "2024-06-11", desktop: 335, mobile: 2 },
  { date: "2024-06-12", desktop: 197, mobile: 2 },
  { date: "2024-06-13", desktop: 197, mobile: 1 },
  { date: "2024-06-14", desktop: 448, mobile: 0 },
  { date: "2024-06-15", desktop: 473, mobile: 0 },
  { date: "2024-06-16", desktop: 338, mobile: 0 },
  { date: "2024-06-17", desktop: 499, mobile: 0 },
  { date: "2024-06-18", desktop: 315, mobile: 3 },
  { date: "2024-06-19", desktop: 235, mobile: 1 },
  { date: "2024-06-20", desktop: 177, mobile: 2 },
  { date: "2024-06-21", desktop: 82, mobile: 1 },
  { date: "2024-06-22", desktop: 81, mobile: 1 },
  { date: "2024-06-23", desktop: 252, mobile: 0 },
  { date: "2024-06-24", desktop: 294, mobile: 0 },
  { date: "2024-06-25", desktop: 201, mobile: 0 },
  { date: "2024-06-26", desktop: 213, mobile: 1 },
  { date: "2024-06-27", desktop: 420, mobile: 4 },
  { date: "2024-06-28", desktop: 233, mobile: 1 },
  { date: "2024-06-29", desktop: 78, mobile: 1 },
  { date: "2024-06-30", desktop: 340, mobile: 2 },
  { date: "2024-06-31", desktop: 178, mobile: 2 },
  { date: "2024-07-01", desktop: 178, mobile: 2 },
  { date: "2024-07-02", desktop: 470, mobile: 0 },
  { date: "2024-07-03", desktop: 103, mobile: 1 },
  { date: "2024-07-04", desktop: 439, mobile: 3 },
  { date: "2024-07-05", desktop: 88, mobile: 1 },
  { date: "2024-07-06", desktop: 294, mobile: 2 },
  { date: "2024-07-07", desktop: 323, mobile: 0 },
  { date: "2024-07-08", desktop: 385, mobile: 0 },
  { date: "2024-07-09", desktop: 438, mobile: 0 },
  { date: "2024-07-10", desktop: 155, mobile: 2 },
  { date: "2024-07-11", desktop: 92, mobile: 1 },
  { date: "2024-07-12", desktop: 492, mobile: 0 },
  { date: "2024-07-13", desktop: 81, mobile: 1 },
  { date: "2024-07-14", desktop: 426, mobile: 0 },
  { date: "2024-07-15", desktop: 307, mobile: 0 },
  { date: "2024-07-16", desktop: 371, mobile: 3 },
  { date: "2024-07-17", desktop: 475, mobile: 0 },
  { date: "2024-07-18", desktop: 107, mobile: 1 },
  { date: "2024-07-19", desktop: 341, mobile: 2 },
  { date: "2024-07-20", desktop: 408, mobile: 0 },
  { date: "2024-07-21", desktop: 169, mobile: 2 },
  { date: "2024-07-22", desktop: 317, mobile: 2 },
  { date: "2024-07-23", desktop: 480, mobile: 0 },
  { date: "2024-07-24", desktop: 132, mobile: 0 },
  { date: "2024-07-25", desktop: 141, mobile: 0 },
  { date: "2024-07-26", desktop: 434, mobile: 0 },
  { date: "2024-07-27", desktop: 448, mobile: 0 },
  { date: "2024-07-28", desktop: 149, mobile: 0 },
  { date: "2024-07-29", desktop: 103, mobile: 1 },
  { date: "2024-07-30", desktop: 446, mobile: 0 },
]

const chartConfig = {
  views: {
    label: "Requests",
  },
  desktop: {
    label: "Success",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Failure",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ApiRequests() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>API Requests</CardTitle>
          <CardDescription>
            Showing total API Request count for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
