"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/api";
import { OrderDetails } from "@/components/orders/order-details";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { PageHeader } from "@/components/ui/page-header";
import { Button, Group } from "@mantine/core";
import { ArrowLeft, Edit, Printer } from "lucide-react";
import Link from "next/link";

export default function OrderPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const result = await getOrderById(id as string);
        if (!result) {
          router.replace("/404");
          return;
        }
        setOrder(result);
      } catch (err) {
        console.error("Error fetching order:", err);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id, router]);

  if (loading) return <p className="p-8">Loading order details...</p>;
  if (!order) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders">
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            className="mb-4"
          >
            Back to Orders
          </Button>
        </Link>

        <div className="flex justify-between items-center">
          <PageHeader
            title={`Order #${order.reference}`}
            description={`Created on ${new Date(
              order.createdAt
            ).toLocaleDateString()}`}
          />

          <Group>
            <Button variant="outline" leftSection={<Printer size={16} />}>
              Print
            </Button>
            <Link href={`/orders/${order.id}/edit`}>
              <Button leftSection={<Edit size={16} />} color="blue">
                Edit Order
              </Button>
            </Link>
          </Group>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderDetails order={order} />
        </div>
        <div>
          <OrderTimeline order={order} />
        </div>
      </div>
    </main>
  );
}
