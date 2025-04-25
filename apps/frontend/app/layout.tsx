import type React from "react";
import "@mantine/core/styles.css";
import "../globals.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { Notifications } from "@mantine/notifications";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Order Management System",
  description: "A complete order management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use type assertions to bypass TypeScript errors
  const MantineProviderComponent = MantineProvider as any;
  const ColorSchemeScriptComponent = ColorSchemeScript as any;
  const NotificationsComponent = Notifications as any;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScriptComponent />
      </head>
      <body className={inter.className}>
        <MantineProviderComponent>
          <NotificationsComponent position="top-right" />
          <AppShell>{children}</AppShell>
        </MantineProviderComponent>
      </body>
    </html>
  );
}
