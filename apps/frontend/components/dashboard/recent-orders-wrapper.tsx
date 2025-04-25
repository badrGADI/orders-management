// components/dashboard/recent-orders-wrapper.tsx
"use client"
import dynamic from 'next/dynamic'

const RecentOrders = dynamic(
  () => import('./recent-orders').then(mod => mod.RecentOrders),
  { ssr: false, loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg"></div> }
)

export function RecentOrdersWrapper() {
  return <RecentOrders />
}