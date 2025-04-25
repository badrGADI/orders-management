"use client"

import { Card, Text, Timeline, Group, Button } from "@mantine/core"
import { IconCheck, IconTruck, IconPackage, IconCreditCard } from "@tabler/icons-react"
import type { Order } from "@/lib/types"
import { useState } from "react"
import { updateOrderStatus } from "@/lib/api/orders"

interface OrderTimelineProps {
  order: Order
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true)
    try {
      await updateOrderStatus(order.id, newStatus)
      setCurrentStatus(newStatus)
    } catch (error) {
      console.error("Failed to update order status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getTimelineItems = () => {
    const statuses = ["new", "processing", "shipped", "delivered"]
    const statusIndex = statuses.indexOf(currentStatus.toLowerCase())

    return [
      {
        title: "Order Placed",
        description: `Order #${order.reference} was created`,
        date: new Date(order.createdAt).toLocaleDateString(),
        icon: <IconPackage size={16} />,
        active: true,
      },
      {
        title: "Processing",
        description: "Order is being prepared",
        date: statusIndex >= 1 ? "In progress" : "",
        icon: <IconCreditCard size={16} />,
        active: statusIndex >= 1,
      },
      {
        title: "Shipped",
        description: "Order has been shipped",
        date: statusIndex >= 2 ? "On the way" : "",
        icon: <IconTruck size={16} />,
        active: statusIndex >= 2,
      },
      {
        title: "Delivered",
        description: "Order has been delivered",
        date: statusIndex >= 3 ? "Completed" : "",
        icon: <IconCheck size={16} />,
        active: statusIndex >= 3,
      },
    ]
  }

  const nextStatus = () => {
    const statuses = ["new", "processing", "shipped", "delivered"]
    const currentIndex = statuses.indexOf(currentStatus.toLowerCase())
    if (currentIndex < statuses.length - 1) {
      return statuses[currentIndex + 1]
    }
    return null
  }

  const next = nextStatus()

  return (
    <Card withBorder radius="md" p="lg">
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>Order Timeline</Text>
      </Card.Section>

      <Timeline active={getTimelineItems().filter((item) => item.active).length - 1} mt="md" bulletSize={24}>
        {getTimelineItems().map((item, index) => (
          <Timeline.Item key={index} bullet={item.icon} title={item.title}>
            <Text size="xs" mt={4}>
              {item.description}
            </Text>
            {item.date && (
              <Text size="xs" c="dimmed" mt={4}>
                {item.date}
              </Text>
            )}
          </Timeline.Item>
        ))}
      </Timeline>

      {currentStatus.toLowerCase() !== "cancelled" && (
        <Card.Section withBorder inheritPadding py="xs" mt="sm">
          <Group justify="space-between" align="center">
            <Text fw={500}>Update Status</Text>
            <Group>
              {next && (
                <Button size="xs" onClick={() => handleStatusUpdate(next)} loading={isUpdating}>
                  Mark as {next.charAt(0).toUpperCase() + next.slice(1)}
                </Button>
              )}
              {currentStatus.toLowerCase() !== "cancelled" && (
                <Button
                  size="xs"
                  color="red"
                  variant="outline"
                  onClick={() => handleStatusUpdate("cancelled")}
                  loading={isUpdating}
                >
                  Cancel Order
                </Button>
              )}
            </Group>
          </Group>
        </Card.Section>
      )}
    </Card>
  )
}
