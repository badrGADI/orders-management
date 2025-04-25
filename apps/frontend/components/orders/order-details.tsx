"use client"

import { Card, Text, Group, Badge, Table, Divider } from "@mantine/core"
import type { Order } from "@/lib/types"

interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
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

  return (
    <Card withBorder radius="md" p="lg">
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={500}>Order Details</Text>
          <Badge color={getStatusColor(order.status)} size="lg">
            {order.status}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs" mt="sm">
        <Text fw={500} mb="xs">
          Customer Information
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text size="sm" c="dimmed">
              Name
            </Text>
            <Text>{order.customer.name}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Email
            </Text>
            <Text>{order.customer.email}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Phone
            </Text>
            <Text>{order.customer.phone}</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Address
            </Text>
            <Text>{order.customer.address}</Text>
          </div>
        </div>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs" mt="sm">
        <Text fw={500} mb="xs">
          Order Items
        </Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {order.items.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <div>
                    <Text size="sm">{item.product.name}</Text>
                    <Text size="xs" c="dimmed">
                      {item.product.id}
                    </Text>
                  </div>
                </Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td>{item.unitPrice.toFixed(2)} €</Table.Td>
                <Table.Td>{(item.quantity * item.unitPrice).toFixed(2)} €</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="xs" mt="sm">
        <div className="flex flex-col items-end">
          <Group justify="space-between" w="100%" mb="xs">
            <Text>Subtotal</Text>
            <Text>{order.subtotal.toFixed(2)} €</Text>
          </Group>
          <Group justify="space-between" w="100%" mb="xs">
            <Text>Tax</Text>
            <Text>{order.tax.toFixed(2)} €</Text>
          </Group>
          <Group justify="space-between" w="100%" mb="xs">
            <Text>Shipping</Text>
            <Text>{order.shipping.toFixed(2)} €</Text>
          </Group>
          <Divider w="100%" my="sm" />
          <Group justify="space-between" w="100%">
            <Text fw={700}>Total</Text>
            <Text fw={700} size="lg">
              {order.totalAmount.toFixed(2)} €
            </Text>
          </Group>
        </div>
      </Card.Section>
    </Card>
  )
}
