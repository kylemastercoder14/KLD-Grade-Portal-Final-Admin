import * as React from "react";
import { LifeBuoy, Send } from "lucide-react"; // Lucide icons
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  IconBooks,
  IconBrandTabler,
  IconLayersIntersect,
  IconLayoutColumns,
  IconLayoutDashboard,
  IconNotebook,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import Image from "next/image";
import { Admin } from "@prisma/client";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  admin: Admin | null;
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconBrandTabler,
    },
    {
      title: "Year Level",
      url: "/admin/year-level",
      icon: IconLayersIntersect,
    },
    {
      title: "Programs",
      url: "/admin/programs",
      icon: IconBooks,
    },
    {
      title: "Sections",
      url: "/admin/sections",
      icon: IconLayoutColumns,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: IconNotebook,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: IconSchool,
    },
    {
      title: "Teachers",
      url: "/admin/teacher",
      icon: IconUsers,
    },
    {
      title: "Others",
      url: "#",
      icon: IconLayoutDashboard,
      items: [
        {
          title: "Assign Adviser",
          url: "/admin/assign-adviser",
        },
        {
          title: "Assign Course Teacher",
          url: "/admin/assign-course-teacher",
        },
        {
          title: "Semesters",
          url: "/admin/semesters",
        },
        {
          title: "Announcements",
          url: "/admin/announcements",
        },
        {
          title: "Logs",
          url: "/admin/logs",
        },
        {
          title: "Back-up Database",
          url: "/admin/database",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ admin, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image
                  src="/images/kld-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    KLD Grade Portal
                  </span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser admin={admin} />
      </SidebarFooter>
    </Sidebar>
  );
}
