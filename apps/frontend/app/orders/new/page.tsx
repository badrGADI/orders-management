"use client";

import { OrderForm } from "@/components/orders/order-form";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewOrderPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/orders"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to Orders</span>
        </Link>

        <PageHeader
          title="Create New Order"
          description="Add a new customer order to the system"
        />
      </div>

      <div className="mt-8">
        <OrderForm />
      </div>
    </main>
  );
}
