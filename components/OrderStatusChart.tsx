import { getOrderStatusData } from "@/lib/metrics";
import { useEffect, useState } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Tooltip,
	Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface OrderStatusData {
	name: string;
	value: number;
}

export function OrderStatusChart() {
	const [data, setData] = useState<OrderStatusData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const statusData = await getOrderStatusData();
			setData(statusData);
		};
		fetchData();
	}, []);

	return (
		<div className="h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
							outerRadius={80}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
