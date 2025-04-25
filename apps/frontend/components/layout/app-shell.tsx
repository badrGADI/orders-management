"use client";
import type React from "react";
import { AppShell as MantineAppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  // Use type assertions to bypass TypeScript errors
  const Shell = MantineAppShell as any;
  const ShellHeader = MantineAppShell.Header as any;
  const ShellNavbar = MantineAppShell.Navbar as any;
  const ShellMain = MantineAppShell.Main as any;

  return (
    <Shell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <ShellHeader>
        <Header opened={opened} toggle={toggle} />
      </ShellHeader>
      <ShellNavbar p="md">
        <Sidebar />
      </ShellNavbar>
      <ShellMain>{children}</ShellMain>
    </Shell>
  );
}
