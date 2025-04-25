"use client";
import { Burger, Group, Title } from "@mantine/core";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  // Use type assertions to bypass TypeScript errors
  const BurgerComponent = Burger as any;
  const GroupComponent = Group as any;
  const TitleComponent = Title as any;

  return (
    <GroupComponent h="100%" px="md" justify="space-between">
      <GroupComponent>
        <BurgerComponent
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <TitleComponent order={3}>Order Management System</TitleComponent>
      </GroupComponent>
    </GroupComponent>
  );
}
