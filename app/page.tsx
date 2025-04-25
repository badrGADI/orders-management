import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { PageHeader } from "@/components/ui/page-header"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader title="Dashboard" description="Overview of your order management system" />

      <div className="mt-8">
        <DashboardStats />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
        <RecentOrders />
      </div>
    </main>
  )
}
