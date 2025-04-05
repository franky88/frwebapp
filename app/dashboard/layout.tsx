"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/dashboard/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  return (
    <SidebarProvider>
      <AppSidebar onSelectMenu={setSelectedMenu} />
      <SidebarInset>
        <Header selectedMenu={selectedMenu} />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
