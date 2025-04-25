"use client"
import { Group, Code, NavLink, rem } from "@mantine/core"
import {
  IconHome2,
  IconShoppingCart,
  IconUsers,
  IconPackage,
  IconReportAnalytics,
  IconSettings,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const data = [
  { link: "/", label: "Dashboard", icon: IconHome2 },
  { link: "/orders", label: "Orders", icon: IconShoppingCart },
  { link: "/customers", label: "Customers", icon: IconUsers },
  { link: "/products", label: "Products", icon: IconPackage },
  { link: "/reports", label: "Reports", icon: IconReportAnalytics },
  { link: "/settings", label: "Settings", icon: IconSettings },
]

export function Sidebar() {
  const pathname = usePathname()

  const links = data.map((item) => (
    <Link href={item.link} key={item.label} className="no-underline text-inherit">
      <NavLink
        active={pathname === item.link}
        label={item.label}
        leftSection={<item.icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
      />
    </Link>
  ))

  return (
    <>
      <div className="mb-4 p-2 border-b border-gray-200">
        <Group justify="space-between">
          <Code fw={700}>v1.0.0</Code>
        </Group>
      </div>

      <div className="flex flex-col gap-1">{links}</div>
    </>
  )
}
