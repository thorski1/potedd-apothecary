import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentActivity } from "@/components/RecentActivity"
import { KeyMetrics } from "@/components/KeyMetrics"
import { SalesChart } from "@/components/SalesChart"
import { PopularProductsChart } from "@/components/PopularProductsChart"
import { OrderStatusChart } from "@/components/OrderStatusChart"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <KeyMetrics />
      <div className="grid gap-6 grid-cols-1">
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
  )
}