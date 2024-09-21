import Header from "@/components/globals/header";
import { Sidebar } from "@/components/globals/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-white dark:bg-neutral-900 w-full flex-1",
        "h-screen"
      )}
    >
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="flex-1 px-4 md:px-10 py-5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
