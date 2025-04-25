"use client";

import {
  Table,
  Badge,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  ScrollArea,
  Pagination,
  Center,
  Loader,
} from "@mantine/core";
import { IconEye, IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/types";

export interface OrdersTableProps {
  page?: number;
  status?: string;
  search?: string;
}

export function OrdersTable({
  page = 1,
  status = "",
  search = "",
}: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data, totalPages } = await getOrders(page, status, search);
        setOrders(data);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, status, search]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (status) params.set("status", status);
    if (search) params.set("search", search);

    router.push(`${pathname}?${params.toString()}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "blue";
      case "processing":
        return "yellow";
      case "shipped":
        return "teal";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <Center className="h-[200px]">
        <Loader />
      </Center>
    );
  }

  if (orders.length === 0) {
    return <Text>No orders found matching your criteria.</Text>;
  }

  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>
        <Anchor
          component={Link}
          href={`/orders/${order.id}`}
          className="text-sm"
        >
          #{order.reference}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text className="text-sm">{order.customer.name}</Text>
        <Text className="text-xs text-gray-500">{order.customer.email}</Text>
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
          <ActionIcon
            component={Link}
            href={`/orders/${order.id}`}
            variant="subtle"
          >
            <IconEye style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            href={`/orders/${order.id}/edit`}
            variant="subtle"
          >
            <IconEdit
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
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

      <Center className="mt-8">
        <Pagination
          total={totalPages}
          value={page}
          onChange={handlePageChange}
        />
      </Center>
    </div>
  );
}
