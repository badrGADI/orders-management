// app/page.tsx
import { PageHeader } from "@/components/ui/page-header";
import { Suspense } from "react";
import { DashboardStatsWrapper } from "@/components/dashboard/dashboard-stats-wrapper";
import { RecentOrdersWrapper } from "@/components/dashboard/recent-orders-wrapper";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your order management system"
      />

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
          }
        >
          <DashboardStatsWrapper />
        </Suspense>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>
        <Suspense
          fallback={
            <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
          }
        >
          <RecentOrdersWrapper />
        </Suspense>
      </div>
    </main>
  );
}
