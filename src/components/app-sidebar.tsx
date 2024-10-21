import * as React from "react";
import {
  Command,
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
} from "@tabler/icons-react"; // Tabler icons

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
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
