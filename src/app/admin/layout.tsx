import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/globals/header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
