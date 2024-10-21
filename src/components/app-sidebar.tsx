import * as React from "react";
import {
  LifeBuoy,
  Send,
} from "lucide-react"; // Lucide icons
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
  IconCalendarMonth,
  IconDatabase,
  IconLayersIntersect,
  IconLayoutColumns,
  IconLogs,
  IconNotebook,
  IconSchool,
  IconSpeakerphone,
} from "@tabler/icons-react";
import Image from "next/image";

const data = {
  user: {
    name: "Victoria Balbio",
    email: "Administrator",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Semesters",
      url: "/admin/semesters",
      icon: IconCalendarMonth,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: IconSchool,
    },
    {
      title: "Announcements",
      url: "/admin/announcements",
      icon: IconSpeakerphone,
    },
    {
      title: "Logs",
      url: "/admin/logs",
      icon: IconLogs,
    },
    {
      title: "Back-up Database",
      url: "/admin/database",
      icon: IconDatabase,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <Image src="/images/kld-logo.png" alt="Logo" width={40} height={40} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">KLD Grade Portal</span>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
