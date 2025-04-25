// components/orders/edit-order-page-client.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderById } from "@/lib/api";
import { OrderForm } from "@/components/orders/order-form";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditOrderPageClient() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const order = await getOrderById(id as string);
        if (!order) {
          router.replace("/404");
        } else {
          setOrder(order);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id, router]);

  if (loading) return <p className="p-8">Loading order...</p>;
  if (!order) return null;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/orders/${order.id}`}>
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={16} />}
            className="mb-4"
          >
            Back to Order
          </Button>
        </Link>

        <PageHeader
          title={`Edit Order #${order.reference}`}
          description="Modify the details of this order"
        />
      </div>

      <div className="mt-8">
        <OrderForm initialData={order} />
      </div>
    </main>
  );
}
