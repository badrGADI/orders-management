"use client"

import { Table, Badge, Group, Text, ActionIcon, Anchor, rem, ScrollArea } from "@mantine/core"
import { IconEye, IconEdit } from "@tabler/icons-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getRecentOrders } from "@/lib/api"
import type { Order } from "@/lib/types"

export function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getRecentOrders()
        setOrders(data)
      } catch (error) {
        console.error("Failed to fetch recent orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "blue"
      case "processing":
        return "yellow"
      case "shipped":
        return "teal"
      case "delivered":
        return "green"
      case "cancelled":
        return "red"
      default:
        return "gray"
    }
  }

  if (loading) {
    return <Text>Loading recent orders...</Text>
  }

  if (orders.length === 0) {
    return <Text>No recent orders found.</Text>
  }

  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>
        <Anchor component={Link} href={`/orders/${order.id}`} size="sm">
          #{order.reference}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{order.customer.name}</Text>
        <Text size="xs" c="dimmed">
          {order.customer.email}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(order.status)} variant="light">
          {order.status}
        </Badge>
      </Table.Td>
      <Table.Td>{new Date(order.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>{order.totalAmount.toFixed(2)} €</Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon component={Link} href={`/orders/${order.id}`} variant="subtle">
            <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component={Link} href={`/orders/${order.id}/edit`} variant="subtle">
            <IconEdit style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Order Ref</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  )
}
