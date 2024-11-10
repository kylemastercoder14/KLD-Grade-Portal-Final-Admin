import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/globals/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { useUser } from "@/hooks/user-user";
import { redirect } from "next/navigation";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { admin } = await useUser();
  if (!admin) redirect("/");
  return (
    <SidebarProvider>
      <AppSidebar admin={admin} />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
