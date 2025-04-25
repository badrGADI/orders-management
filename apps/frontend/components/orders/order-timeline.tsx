"use client";

import { Timeline, Text, Card, Badge } from "@mantine/core";
import { IconPackage, IconTruck, IconCheck, IconX } from "@tabler/icons-react";

const STATUS_ICONS = {
  new: IconPackage,
  processing: IconTruck,
  shipped: IconTruck,
  delivered: IconCheck,
  cancelled: IconX,
};

const STATUS_COLORS = {
  new: "blue",
  processing: "yellow",
  shipped: "teal",
  delivered: "green",
  cancelled: "red",
};

export function OrderTimeline({ order }) {
  // Consistent date formatting to prevent hydration errors
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const timelineItems = [
    {
      title: "Order Placed",
      Icon: IconPackage,
      date: formatDate(order.createdAt),
      description: "Order has been received and is being processed",
    },
    ...(order.status === "processing"
      ? [
          {
            title: "Processing",
            Icon: IconTruck,
            date: formatDate(order.processingDate),
            description: "Order is being prepared for shipping",
          },
        ]
      : []),
    ...(order.status === "shipped"
      ? [
          {
            title: "Shipped",
            Icon: IconTruck,
            date: formatDate(order.shippedDate),
            description: "Order has been sent out for delivery",
          },
        ]
      : []),
    ...(order.status === "delivered"
      ? [
          {
            title: "Delivered",
            Icon: IconCheck,
            date: formatDate(order.deliveredDate),
            description: "Order has been successfully delivered",
          },
        ]
      : []),
    ...(order.status === "cancelled"
      ? [
          {
            title: "Cancelled",
            Icon: IconX,
            date: formatDate(order.cancelledDate),
            description: "Order has been cancelled",
          },
        ]
      : []),
  ];

  return (
    <Card withBorder radius="md" p="lg">
      <Card.Section withBorder inheritPadding py="xs">
        <Text fw={500}>Order Timeline</Text>
      </Card.Section>

      <Timeline active={timelineItems.length - 1} mt="md" bulletSize={24}>
        {timelineItems.map((item, index) => {
          const Icon = item.Icon;
          return (
            <Timeline.Item
              key={index}
              bullet={<Icon size={16} />}
              title={item.title}
            >
              <Badge
                color={STATUS_COLORS[order.status.toLowerCase()] || "gray"}
                variant="light"
                size="xs"
                mb={4}
              >
                {order.status}
              </Badge>

              {item.date && (
                <Text size="xs" c="dimmed" mt={4}>
                  {item.date}
                </Text>
              )}

              {item.description && (
                <Text size="xs" c="dimmed">
                  {item.description}
                </Text>
              )}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Card>
  );
}
