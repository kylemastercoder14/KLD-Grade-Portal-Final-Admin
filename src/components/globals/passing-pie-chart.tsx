"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts";

interface InstituteData {
    institute: string;
    passingRate: number;
}

const PassingPieChart = ({ data }: { data: InstituteData[] }) => {
    const chartData = data.map((institute) => ({
        name: institute.institute,
        value: institute.passingRate,
        fill: generateColor(institute.institute),
    }));

    return (
        <Card>
            <CardHeader className="pb-0">
                <div className="flex md:flex-row flex-col md:items-center items-start justify-between">
                    <CardTitle className="text-[18px]">Passing Rate Per Institute</CardTitle>
                    <Select>
                        <SelectTrigger className="w-[200px] border dark:border-input border-zinc-300">
                            <SelectValue placeholder="Academic Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2021 - 2022">2021 - 2022</SelectItem>
                            <SelectItem value="2022 - 2023">2022 - 2023</SelectItem>
                            <SelectItem value="2023 - 2024">2023 - 2024</SelectItem>
                            <SelectItem value="2024 - 2025">2024 - 2025</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mx-auto aspect-square max-h-[300px]">
                    <PieChart width={300} height={300}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </CardContent>
        </Card>
    );
};

const generateColor = (institute: string): string => {
    const colors: { [key: string]: string } = {
        BSIS: "#355F2E",
        BSPSY: "#E4E0E1",
        BSCE: "#0A3981",
        BSM: "#FF77B7",
        BSN: "#FFB1B1",
    };
    return colors[institute] || "#8884d8"; // Fallback color
};

export default PassingPieChart;
