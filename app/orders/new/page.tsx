import { OrderForm } from "@/components/orders/order-form"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@mantine/core"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewOrderPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/orders">
          <Button variant="subtle" leftSection={<ArrowLeft size={16} />} className="mb-4">
            Back to Orders
          </Button>
        </Link>

        <PageHeader title="Create New Order" description="Add a new customer order to the system" />
      </div>

      <div className="mt-8">
        <OrderForm />
      </div>
    </main>
  )
}
