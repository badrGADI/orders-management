"use client";
import { NavLink, Stack } from "@mantine/core";
import {
  IconHome,
  IconPackage,
  IconUsers,
  IconClipboardList,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // Use type assertions to bypass TypeScript errors
  const StackComponent = Stack as any;
  const NavLinkComponent = NavLink as any;

  // Only render on the client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-full w-full">Loading navigation...</div>;
  }

  return (
    <StackComponent>
      <NavLinkComponent
        key="/"
        component={Link}
        href="/"
        label="Dashboard"
        leftSection={<IconHome size={20} />}
        active={pathname === "/"}
      />
      <NavLinkComponent
        key="/orders"
        component={Link}
        href="/orders"
        label="Orders"
        leftSection={<IconClipboardList size={20} />}
        active={pathname === "/orders"}
      />
      <NavLinkComponent
        key="/products"
        component={Link}
        href="/products"
        label="Products"
        leftSection={<IconPackage size={20} />}
        active={pathname === "/products"}
      />
      <NavLinkComponent
        key="/customers"
        component={Link}
        href="/customers"
        label="Customers"
        leftSection={<IconUsers size={20} />}
        active={pathname === "/customers"}
      />
    </StackComponent>
  );
}
