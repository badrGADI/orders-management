"use client"

import { Card, Group, Text, SimpleGrid, rem } from "@mantine/core"
import { IconShoppingCart, IconTruck, IconPackage, IconCoin } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { getDashboardStats } from "@/lib/api"

export function DashboardStats() {
  const [stats, setStats] = useState([
    {
      title: "Total Orders",
      value: "0",
      diff: 0,
      icon: IconShoppingCart,
      color: "blue",
    },
    {
      title: "Pending Delivery",
      value: "0",
      diff: 0,
      icon: IconTruck,
      color: "yellow",
    },
    {
      title: "Products Sold",
      value: "0",
      diff: 0,
      icon: IconPackage,
      color: "green",
    },
    {
      title: "Revenue",
      value: "€0",
      diff: 0,
      icon: IconCoin,
      color: "teal",
    },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats([
          {
            title: "Total Orders",
            value: data.totalOrders.toString(),
            diff: data.ordersDiff,
            icon: IconShoppingCart,
            color: "blue",
          },
          {
            title: "Pending Delivery",
            value: data.pendingDelivery.toString(),
            diff: data.pendingDiff,
            icon: IconTruck,
            color: "yellow",
          },
          {
            title: "Products Sold",
            value: data.productsSold.toString(),
            diff: data.productsDiff,
            icon: IconPackage,
            color: "green",
          },
          {
            title: "Revenue",
            value: `€${data.revenue.toFixed(2)}`,
            diff: data.revenueDiff,
            icon: IconCoin,
            color: "teal",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = stats.map((stat) => {
    const Icon = stat.icon
    const diffColor = stat.diff > 0 ? "teal" : "red"
    const diffFormatted = stat.diff > 0 ? `+${stat.diff}%` : `${stat.diff}%`

    return (
      <Card key={stat.title} withBorder p="md" radius="md">
        <Group justify="space-between">
          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.title}
            </Text>
            <Text fw={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <Icon
            style={{ width: rem(30), height: rem(30) }}
            stroke={1.5}
            color={`var(--mantine-color-${stat.color}-6)`}
          />
        </Group>
        <Text c={diffColor} size="sm" mt="md">
          <span>{diffFormatted}</span> <span>from last month</span>
        </Text>
      </Card>
    )
  })

  return <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>{statCards}</SimpleGrid>
}
