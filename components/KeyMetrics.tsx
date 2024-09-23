import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	getTotalSales,
	getTotalOrders,
	getAverageOrderValue,
	getTopSellingProduct,
} from "@/lib/metrics";
import { useState, useEffect } from "react";
import {
	DollarSign,
	ShoppingCart,
	TrendingUp,
	Package,
} from "lucide-react";

/**
 * MetricCard component for displaying a single metric.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the metric.
 * @param {string} props.value - The value of the metric.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
const MetricCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }): JSX.Element => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium">
				{title}
			</CardTitle>
			<Icon className="h-4 w-4 text-muted-foreground" />
		</CardHeader>
		<CardContent>
			<div className="text-2xl font-bold">{value}</div>
		</CardContent>
	</Card>
);

/**
 * KeyMetrics component for displaying important business metrics.
 * 
 * This component fetches and displays key metrics such as total sales,
 * total orders, average order value, and top selling product.
 *
 * @returns {JSX.Element} The rendered KeyMetrics component.
 */
export function KeyMetrics(): JSX.Element {
	const [metrics, setMetrics] = useState([
		{
			title: "Total Sales",
			value: "Loading...",
			icon: DollarSign,
		},
		{
			title: "Total Orders",
			value: "Loading...",
			icon: ShoppingCart,
		},
		{
			title: "Average Order Value",
			value: "Loading...",
			icon: TrendingUp,
		},
		{
			title: "Top Selling Product",
			value: "Loading...",
			icon: Package,
		},
	]);

	useEffect(() => {
		async function fetchMetrics() {
			try {
				const totalSales = await getTotalSales();
				const totalOrders = await getTotalOrders();
				const averageOrderValue = await getAverageOrderValue();
				const topSellingProduct = await getTopSellingProduct();

				setMetrics([
					{
						title: "Total Sales",
						value: `$${totalSales.toFixed(2)}`,
						icon: DollarSign,
					},
					{
						title: "Total Orders",
						value: totalOrders.toString(),
						icon: ShoppingCart,
					},
					{
						title: "Average Order Value",
						value: `$${averageOrderValue.toFixed(2)}`,
						icon: TrendingUp,
					},
					{
						title: "Top Selling Product",
						value: topSellingProduct,
						icon: Package,
					},
				]);
			} catch (error) {
				console.error("Error fetching metrics:", error);
				setMetrics(
					metrics.map((metric) => ({
						...metric,
						value: "Error loading data",
					}))
				);
			}
		}

		fetchMetrics();
	}, []);

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			{metrics.map((metric) => (
				<MetricCard key={metric.title} {...metric} />
			))}
		</div>
	);
}
