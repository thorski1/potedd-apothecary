import { getPopularProducts } from "@/lib/metrics";
import { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from "recharts";

interface PopularProduct {
	name: string;
	sales: number;
}

export function PopularProductsChart() {
	const [data, setData] = useState<PopularProduct[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const products = await getPopularProducts();
			setData(products);
		};
		fetchData();
	}, []);

	return (
		<div className="h-[300px]">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<XAxis
						dataKey="name"
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
						tickFormatter={(value) => `${value}`}
					/>
					<Tooltip />
					<Bar
						dataKey="sales"
						fill="#8884d8"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
