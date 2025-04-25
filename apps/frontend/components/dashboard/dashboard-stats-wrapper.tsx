// components/dashboard/dashboard-stats-wrapper.tsx
"use client";
import dynamic from "next/dynamic";

const DashboardStats = dynamic(
  () => import("./dashboard-stats").then((mod) => mod.DashboardStats),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 bg-gray-100 animate-pulse rounded-lg"></div>
    ),
  }
);

export function DashboardStatsWrapper() {
  return <DashboardStats />;
}
