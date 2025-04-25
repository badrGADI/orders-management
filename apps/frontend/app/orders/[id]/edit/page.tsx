import { OrderForm } from "@/components/orders/order-form"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getOrderById } from "@/lib/api"

export default async function EditOrderPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  try {
    const order = await getOrderById(orderId)

    if (!order) {
      notFound()
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/orders/${orderId}`}>
            <Button variant="subtle" leftSection={<ArrowLeft size={16} />} className="mb-4">
              Back to Order
            </Button>
          </Link>

          <PageHeader title={`Edit Order #${order.reference}`} description="Modify the details of this order" />
        </div>

        <div className="mt-8">
          <OrderForm initialData={order} />
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error fetching order:", error)
    notFound()
  }
}
