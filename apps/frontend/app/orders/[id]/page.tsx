import { OrderDetails } from "@/components/orders/order-details";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { PageHeader } from "@/components/ui/page-header";
import { Button, Group } from "@mantine/core";
import { ArrowLeft, Edit, Printer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api";

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const orderId = params.id;

  try {
    const order = await getOrderById(orderId);

    if (!order) {
      notFound();
    }

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
              <Link href={`/orders/${orderId}/edit`}>
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
  } catch (error) {
    console.error("Error fetching order:", error);
    notFound();
  }
}
