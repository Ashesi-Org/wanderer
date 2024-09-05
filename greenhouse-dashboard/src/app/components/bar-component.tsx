"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useFetch from "@/hooks/useFetch";

const chartConfig = {
    views: {
        label: "Value ",
    },
    temperature: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
    },
    humidity: {
        label: "Humidity",
        color: "hsl(var(--chart-2))",
    },
    lightIntensity: {
        label: "Light Intensity",
        color: "hsl(var(--chart-3))",
    },
    Co2: {
        label: "CO2",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig;

const dummyData = [
    { date: "2024-08-01 10:00:00", temperature: 25.45, humidity: 65.12, lightIntensity: 350.45, Co2: 250.67 },
    { date: "2024-08-01 10:10:00", temperature: 30.32, humidity: 42.67, lightIntensity: 410.12, Co2: 340.34 },
    { date: "2024-08-01 10:20:00", temperature: 22.21, humidity: 73.22, lightIntensity: 290.56, Co2: 460.78 },
    { date: "2024-08-01 10:30:00", temperature: 29.89, humidity: 30.67, lightIntensity: 520.34, Co2: 330.45 },
    { date: "2024-08-01 10:40:00", temperature: 28.12, humidity: 54.89, lightIntensity: 430.67, Co2: 270.23 },
    { date: "2024-08-01 10:50:00", temperature: 24.45, humidity: 61.34, lightIntensity: 315.45, Co2: 145.67 },
    { date: "2024-08-01 11:00:00", temperature: 26.78, humidity: 43.45, lightIntensity: 385.12, Co2: 185.56 },
    { date: "2024-08-01 11:10:00", temperature: 31.56, humidity: 48.89, lightIntensity: 455.67, Co2: 350.45 },
    { date: "2024-08-01 11:20:00", temperature: 22.34, humidity: 53.67, lightIntensity: 300.12, Co2: 230.78 },
    { date: "2024-08-01 11:30:00", temperature: 27.89, humidity: 66.12, lightIntensity: 490.34, Co2: 290.12 },
    { date: "2024-08-01 11:00:00", temperature: 26.78, humidity: 43.45, lightIntensity: 385.12, Co2: 185.56 },

    { date: "2024-08-01 11:50:00", temperature: 29.12, humidity: 50.45, lightIntensity: 370.78, Co2: 175.23 },
    { date: "2024-08-01 12:00:00", temperature: 21.78, humidity: 47.56, lightIntensity: 305.45, Co2: 160.67 },
    { date: "2024-08-01 10:00:00", temperature: 25.45, humidity: 65.12, lightIntensity: 350.45, Co2: 250.67 },
    { date: "2024-08-01 10:10:00", temperature: 30.32, humidity: 42.67, lightIntensity: 410.12, Co2: 340.34 },
    { date: "2024-08-01 10:20:00", temperature: 22.21, humidity: 73.22, lightIntensity: 290.56, Co2: 460.78 },
    { date: "2024-08-01 10:30:00", temperature: 29.89, humidity: 30.67, lightIntensity: 520.34, Co2: 330.45 },
    { date: "2024-08-01 10:40:00", temperature: 28.12, humidity: 54.89, lightIntensity: 430.67, Co2: 270.23 },
    { date: "2024-08-01 10:50:00", temperature: 24.45, humidity: 61.34, lightIntensity: 315.45, Co2: 145.67 },
    { date: "2024-08-01 11:00:00", temperature: 26.78, humidity: 43.45, lightIntensity: 385.12, Co2: 185.56 },
    { date: "2024-08-01 11:10:00", temperature: 31.56, humidity: 48.89, lightIntensity: 455.67, Co2: 350.45 },
    { date: "2024-08-01 11:20:00", temperature: 22.34, humidity: 53.67, lightIntensity: 300.12, Co2: 230.78 },
    { date: "2024-08-01 11:30:00", temperature: 27.89, humidity: 66.12, lightIntensity: 490.34, Co2: 290.12 },
    { date: "2024-08-01 11:40:00", temperature: 23.45, humidity: 62.34, lightIntensity: 310.56, Co2: 210.34 },
    { date: "2024-08-01 11:50:00", temperature: 29.12, humidity: 50.45, lightIntensity: 370.78, Co2: 175.23 },
    { date: "2024-08-01 12:00:00", temperature: 21.78, humidity: 47.56, lightIntensity: 305.45, Co2: 160.67 },
    { date: "2024-08-01 11:20:00", temperature: 22.34, humidity: 53.67, lightIntensity: 300.12, Co2: 230.78 },
    { date: "2024-08-01 11:30:00", temperature: 27.89, humidity: 66.12, lightIntensity: 490.34, Co2: 290.12 },
    { date: "2024-08-01 11:40:00", temperature: 23.45, humidity: 62.34, lightIntensity: 310.56, Co2: 210.34 },
    { date: "2024-08-01 11:50:00", temperature: 29.12, humidity: 50.45, lightIntensity: 370.78, Co2: 175.23 },
    { date: "2024-08-01 10:00:00", temperature: 25.45, humidity: 65.12, lightIntensity: 350.45, Co2: 250.67 },
    { date: "2024-08-01 10:10:00", temperature: 30.32, humidity: 42.67, lightIntensity: 410.12, Co2: 340.34 },
    { date: "2024-08-01 10:20:00", temperature: 22.21, humidity: 73.22, lightIntensity: 290.56, Co2: 460.78 },
    { date: "2024-08-01 10:30:00", temperature: 29.89, humidity: 30.67, lightIntensity: 520.34, Co2: 330.45 },
    { date: "2024-08-01 10:40:00", temperature: 28.12, humidity: 54.89, lightIntensity: 430.67, Co2: 270.23 },
    { date: "2024-08-01 10:50:00", temperature: 24.45, humidity: 61.34, lightIntensity: 315.45, Co2: 145.67 },
    { date: "2024-08-01 11:10:00", temperature: 31.56, humidity: 48.89, lightIntensity: 455.67, Co2: 350.45 },
    { date: "2024-08-01 11:20:00", temperature: 22.34, humidity: 53.67, lightIntensity: 300.12, Co2: 230.78 },
    { date: "2024-08-01 11:30:00", temperature: 27.89, humidity: 66.12, lightIntensity: 490.34, Co2: 290.12 },
    { date: "2024-08-01 10:00:00", temperature: 25.45, humidity: 65.12, lightIntensity: 350.45, Co2: 250.67 },
    { date: "2024-08-01 10:10:00", temperature: 30.32, humidity: 42.67, lightIntensity: 410.12, Co2: 340.34 },
    { date: "2024-08-01 11:40:00", temperature: 23.45, humidity: 62.34, lightIntensity: 310.56, Co2: 210.34 },
    { date: "2024-08-01 10:20:00", temperature: 22.21, humidity: 73.22, lightIntensity: 290.56, Co2: 460.78 },
    { date: "2024-08-01 10:30:00", temperature: 29.89, humidity: 30.67, lightIntensity: 520.34, Co2: 330.45 },
    { date: "2024-08-01 10:40:00", temperature: 28.12, humidity: 54.89, lightIntensity: 430.67, Co2: 270.23 },
    { date: "2024-08-01 10:50:00", temperature: 24.45, humidity: 61.34, lightIntensity: 315.45, Co2: 145.67 },
    { date: "2024-08-01 11:00:00", temperature: 26.78, humidity: 43.45, lightIntensity: 385.12, Co2: 185.56 },
    { date: "2024-08-01 11:10:00", temperature: 31.56, humidity: 48.89, lightIntensity: 455.67, Co2: 350.45 },

    { date: "2024-08-01 12:00:00", temperature: 21.78, humidity: 47.56, lightIntensity: 305.45, Co2: 160.67 },
    { date: "2024-08-01 11:40:00", temperature: 23.45, humidity: 62.34, lightIntensity: 310.56, Co2: 210.34 },
    { date: "2024-08-01 11:50:00", temperature: 29.12, humidity: 50.45, lightIntensity: 370.78, Co2: 175.23 },
    { date: "2024-08-01 12:00:00", temperature: 21.78, humidity: 47.56, lightIntensity: 305.45, Co2: 160.67 },

];


export function BarChartComponent() {
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("temperature");

    const chartData = React.useMemo(() => {
        return dummyData.map((item) => ({
            date: new Date(item.date).getTime(), // Convert to timestamp
            temperature: (item.temperature),
            humidity: (item.humidity),
            lightIntensity: (item.lightIntensity),
            Co2: (item.Co2),
        }));
    }, []);

    const total = React.useMemo(() => ({
        temperature: chartData.reduce((acc, curr) => acc + curr.temperature, 0),
        humidity: chartData.reduce((acc, curr) => acc + curr.humidity, 0),
        lightIntensity: chartData.reduce((acc, curr) => acc + curr.lightIntensity, 0),
        Co2: chartData.reduce((acc, curr) => acc + curr.Co2, 0),
    }), [chartData]);

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Bar Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing greenhouse conditions over time
                    </CardDescription>
                </div>
                <div className="flex">
                    {["temperature", "humidity", "lightIntensity", "Co2"].map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-md font-semibold">
                                    {chartConfig[chart].label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(timestamp) => {
                                const date = new Date(timestamp);
                                return date.toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });
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
                                        });
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
