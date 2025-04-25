"use client"

import { Burger, Group, Text, UnstyledButton, Avatar, Menu, rem } from "@mantine/core"
import { IconChevronDown, IconLogout, IconSettings, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import Link from "next/link"

export function Header({ opened, toggle }: { opened: boolean; toggle: () => void }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Link href="/" className="no-underline text-inherit">
          <Text size="lg" fw={700}>
            Order Management System
          </Text>
        </Link>
      </Group>

      <Menu
        width={200}
        position="bottom-end"
        transitionProps={{ transition: "pop-top-right" }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton>
            <Group gap={7}>
              <Avatar src={null} alt="User avatar" radius="xl" size={30} color="blue">
                AD
              </Avatar>
              <Text fw={500} size="sm" lh={1} mr={3}>
                Admin User
              </Text>
              <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
            Profile
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />} color="red">
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
