import { OrdersTable } from "@/components/orders/orders-table";
import { OrdersFilter } from "@/components/orders/orders-filter";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@mantine/core";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams?: { page?: string; status?: string; search?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const status = searchParams?.status || "";
  const search = searchParams?.search || "";

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
