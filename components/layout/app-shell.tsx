"use client"

import type React from "react"
import { AppShell as MantineAppShell } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <Sidebar />
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  )
}
