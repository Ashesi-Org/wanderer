"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"

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

// Generate 45 minutes of data
const generateData = () => {
    const data = [];
    let currentTime = new Date();
    
    for (let i = 0; i < 45; i++) {
        const timestamp = new Date(currentTime.getTime() - i * 60000).toISOString();
        data.push({
            timestamp,
            stressPoints: Math.floor(Math.random() * 100), // Random stress points between 0 and 100
            positiveReinforcement: Math.floor(Math.random() * 100) // Random positive reinforcement between 0 and 100
        });
    }
    
    return data.reverse(); // Reverse to get the earliest data points first
};

const chartData = generateData();

const chartConfig = {
    stressPoints: {
        label: "Stress Points",
        color: "red",
    },
    positiveReinforcement: {
        label: "Positive Reinforcement",
        color: "green",
    },
} satisfies ChartConfig

export function TimeSeriesGraph() {
    return (
        <Card className="w-[410px]">
            <CardHeader>
                <CardTitle>Stress Points vs. Positive Reinforcement</CardTitle>
                <CardDescription>This graph shows stress points and positive reinforcement indices over the 45 minutes session.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="timestamp"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                        />
                        <YAxis />
                        <Tooltip cursor={false} content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                            dataKey="stressPoints"
                            type="monotone"
                            stroke={chartConfig.stressPoints.color}
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            dataKey="positiveReinforcement"
                            type="monotone"
                            stroke={chartConfig.positiveReinforcement.color}
                            strokeWidth={2}
                            dot={true}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Feedback shows improvement in stress management <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Analysis based on mock interview practice sessions
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
