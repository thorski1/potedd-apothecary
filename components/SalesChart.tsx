import { getSalesData } from "@/lib/metrics";
import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

interface SalesData {
	date: string;
	amount: number;
}

export function SalesChart() {
	const [data, setData] = useState<SalesData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const salesData = await getSalesData();
			setData(salesData);
		};
		fetchData();
	}, []);

	return (
		<div className="h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<XAxis
						dataKey="date"
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke="#888888"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value}`}
					/>
					<Tooltip />
					<Line
						type="monotone"
						dataKey="amount"
						stroke="#8884d8"
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
