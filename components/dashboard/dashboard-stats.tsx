"use client"

import { Card, Group, Text, SimpleGrid, rem } from "@mantine/core"
import { IconShoppingCart, IconTruck, IconPackage, IconCoin } from "@tabler/icons-react"

const data = [
  {
    title: "Total Orders",
    value: "1,284",
    diff: 12,
    icon: IconShoppingCart,
    color: "blue",
  },
  {
    title: "Pending Delivery",
    value: "32",
    diff: -4,
    icon: IconTruck,
    color: "yellow",
  },
  {
    title: "Products Sold",
    value: "4,532",
    diff: 8,
    icon: IconPackage,
    color: "green",
  },
  {
    title: "Revenue",
    value: "$45,231",
    diff: 24,
    icon: IconCoin,
    color: "teal",
  },
]

export function DashboardStats() {
  const stats = data.map((stat) => {
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

  return <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>{stats}</SimpleGrid>
}
