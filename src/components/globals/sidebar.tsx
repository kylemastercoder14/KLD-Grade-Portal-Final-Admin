"use client";
import React, { useState } from "react";
import {
  Sidebar as SidebarComponent,
  SidebarBody,
  SidebarLink,
} from "../ui/sidebar";
import {
  IconBooks,
  IconBrandTabler,
  IconCalendarMonth,
  IconDatabase,
  IconFileReport,
  IconLayersIntersect,
  IconLayoutColumns,
  IconLogs,
  IconNotebook,
  IconSchool,
  IconSettings,
  IconSpeakerphone,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const getIconClasses = (path: string) =>
    `h-6 w-6 flex-shrink-0 ${
      pathname === path
        ? "text-black dark:text-white"
        : "text-neutral-500"
    }`;

  const links = [
    {
      title: "General",
      subLinks: [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: (
            <IconBrandTabler className={getIconClasses("/admin/dashboard")} />
          ),
        },
        {
          label: "Year Level",
          href: "/admin/year-level",
          icon: (
            <IconLayersIntersect
              className={getIconClasses("/admin/year-level")}
            />
          ),
        },
        {
          label: "Programs",
          href: "/admin/programs",
          icon: <IconBooks className={getIconClasses("/admin/programs")} />,
        },
        {
          label: "Sections",
          href: "/admin/sections",
          icon: (
            <IconLayoutColumns className={getIconClasses("/admin/sections")} />
          ),
        },
        {
          label: "Courses",
          href: "/admin/courses",
          icon: <IconNotebook className={getIconClasses("/admin/courses")} />,
        },
        {
          label: "Semesters",
          href: "/admin/semesters",
          icon: (
            <IconCalendarMonth className={getIconClasses("/admin/semesters")} />
          ),
        },
        {
          label: "Students",
          href: "/admin/students",
          icon: <IconSchool className={getIconClasses("/admin/students")} />,
        },
      ],
    },
    {
      title: "Others",
      subLinks: [
        {
          label: "Documents",
          href: "/admin/documents",
          icon: (
            <IconFileReport className={getIconClasses("/admin/documents")} />
          ),
        },
        {
          label: "Announcements",
          href: "/admin/announcements",
          icon: (
            <IconSpeakerphone
              className={getIconClasses("/admin/announcements")}
            />
          ),
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: <IconSettings className={getIconClasses("/admin/settings")} />,
        },
        {
          label: "Logs",
          href: "/admin/logs",
          icon: <IconLogs className={getIconClasses("/admin/logs")} />,
        },
        {
          label: "Back-up Database",
          href: "/admin/database",
          icon: <IconDatabase className={getIconClasses("/admin/database")} />,
        },
      ],
    },
  ];

  return (
    <SidebarComponent open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-[#f7f7f7] dark:bg-neutral-950 shadow-md border">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}

          <div>
            {links.map((link, idx) => (
              <>
                {open ? (
                  <p
                    key={idx}
                    className="text-xs font-semibold text-muted-foreground mt-8 mb-3"
                  >
                    {link.title}
                  </p>
                ) : (
                  ""
                )}

                <div className="flex flex-col gap-2">
                  {link.subLinks.map((subLink, idx) => (
                    <SidebarLink key={idx} link={subLink} />
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
      </SidebarBody>
    </SidebarComponent>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/images/kld-logo.png" alt="Logo" width={40} height={40} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        KLD Grade Monitoring System
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 mb-5 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/images/kld-logo.png" alt="Logo" width={40} height={40} />
    </Link>
  );
};
