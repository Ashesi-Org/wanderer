"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react";

// Generate dummy data for emotion switching
const chartData = [
    { numSwitches: 0, frequency: 5 },
    { numSwitches: 1, frequency: 12 },
    { numSwitches: 2, frequency: 20 },
    { numSwitches: 3, frequency: 15 },
    { numSwitches: 4, frequency: 8 },
    { numSwitches: 5, frequency: 3 },
];

const chartConfig = {
    emotionSwitching: {
        label: "Number of Emotion Switches",
        color: "blue",
    },
} satisfies ChartConfig

export function Histogram() {
    return (
        <Card className="w-[410px]">
            <CardHeader>
                <CardTitle>Emotion Switching Frequency</CardTitle>
                <CardDescription>
                    This histogram shows the frequency distribution of emotion switching based on facial and speech emotion recognition during the practice session.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                            top: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="numSwitches"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            label={{ value: "Number of Emotion Switches", position: "insideBottomRight", offset: 0 }}
                        />
                        <YAxis
                            label={{ value: "Frequency", angle: -90, position: "insideLeft", offset: 0 }}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="frequency"
                            fill={chartConfig.emotionSwitching.color}
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Analyzing emotional variability during mock interview practice <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Based on facial and speech emotion recognition data
                </div>
            </CardFooter>
        </Card>
    )
}
