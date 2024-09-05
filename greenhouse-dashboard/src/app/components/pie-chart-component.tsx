"use client"

import { LabelList, Pie, PieChart } from "recharts"

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
    { browser: "temperature", values: 275, fill: "var(--color-chrome)" },
    { browser: "humidity", values: 200, fill: "var(--color-safari)" },
    { browser: "light", values: 187, fill: "var(--color-firefox)" },

]

const chartConfig = {
    values: {
        label: "Values",
    },
    temperature: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
    },
    humidity: {
        label: "Humidity",
        color: "hsl(var(--chart-2))",
    },
    light: {
        label: "Light",
        color: "hsl(var(--chart-3))",
    },

} satisfies ChartConfig

export function PieChartComponent() {
    return (
        <Card >
            <CardHeader className="flex flex-col items-stretch space-y-0 p-4 border-b sm:flex-row">
                <CardTitle>Pie Chart - Interactive</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto max-w-3xl aspect-square max-h-[400px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="values" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="values">
                            <LabelList
                                dataKey="browser"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}
