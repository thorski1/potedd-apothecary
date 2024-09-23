import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RecentActivity } from "@/components/RecentActivity";
import { KeyMetrics } from "@/components/KeyMetrics";
import { SalesChart } from "@/components/SalesChart";
import { PopularProductsChart } from "@/components/PopularProductsChart";
import { OrderStatusChart } from "@/components/OrderStatusChart";

/**
 * DashboardOverview component for displaying an overview of the admin dashboard.
 * 
 * This component includes key metrics, sales overview, popular products,
 * order status, and recent activity.
 *
 * @returns {JSX.Element} The rendered DashboardOverview component.
 */
export function DashboardOverview(): JSX.Element {
	return (
		<div className="space-y-6">
			<KeyMetrics />
      <div className="grid gap-6 grid-cols-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Sales Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<SalesChart />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Popular Products</CardTitle>
					</CardHeader>
					<CardContent>
						<PopularProductsChart />
					</CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Order Status</CardTitle>
					</CardHeader>
					<CardContent>
						<OrderStatusChart />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<RecentActivity />
					</CardContent>
				</Card>
        </div>
      </div>
		</div>
	);
}
