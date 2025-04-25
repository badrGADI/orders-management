"use client"

import { Group, Select, TextInput, Button } from "@mantine/core"
import { IconSearch, IconFilter } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface OrdersFilterProps {
  initialStatus?: string
  initialSearch?: string
}

export function OrdersFilter({ initialStatus = "", initialSearch = "" }: OrdersFilterProps) {
  const [status, setStatus] = useState(initialStatus)
  const [search, setSearch] = useState(initialSearch)
  const router = useRouter()
  const pathname = usePathname()

  const handleFilter = () => {
    const params = new URLSearchParams()
    params.set("page", "1") // Reset to first page when filtering
    if (status) params.set("status", status)
    if (search) params.set("search", search)

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    setStatus("")
    setSearch("")
    router.push(pathname)
  }

  return (
    <Group align="end">
      <TextInput
        label="Search"
        placeholder="Order reference or customer"
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        leftSection={<IconSearch size={16} />}
      />

      <Select
        label="Status"
        placeholder="All statuses"
        value={status}
        onChange={(value) => setStatus(value || "")}
        data={[
          { value: "", label: "All statuses" },
          { value: "new", label: "New" },
          { value: "processing", label: "Processing" },
          { value: "shipped", label: "Shipped" },
          { value: "delivered", label: "Delivered" },
          { value: "cancelled", label: "Cancelled" },
        ]}
        leftSection={<IconFilter size={16} />}
      />

      <Button onClick={handleFilter}>Apply Filters</Button>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </Group>
  )
}
