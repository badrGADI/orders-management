"use client";

import { useSearchParams } from "next/navigation";
import { OrdersTable } from "@/components/orders/orders-table";
import { OrdersFilter } from "@/components/orders/orders-filter";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function OrdersPageClient() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Orders"
          description="Manage and view all customer orders"
        />
        <Link href="/orders/new">
          <Button leftSection={<Plus size={16} />} color="blue">
            New Order
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        <OrdersFilter initialStatus={status} initialSearch={search} />
      </div>

      <div className="mt-6">
        <OrdersTable page={page} status={status} search={search} />
      </div>
    </main>
  );
}
