"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { theme, setTheme } = useTheme(); // Get the current theme and setTheme function
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Handle toggle change
  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4 md:block hidden" />
        <Breadcrumb className="md:block hidden">
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              // Determine if the segment is "admin" to display "Home" instead and set href to /admin/dashboard
              const isAdminSegment = segment === "admin";
              const displayName = isAdminSegment ? "Home" : segment;
              const breadcrumbPath = isAdminSegment
                ? "/admin/dashboard"
                : `/${pathSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === pathSegments.length - 1;

              return (
                <React.Fragment key={breadcrumbPath}>
                  <BreadcrumbItem className="capitalize">
                    {isLast ? (
                      <span>{displayName}</span>
                    ) : (
                      <Link href={breadcrumbPath} passHref>
                        <BreadcrumbLink asChild>
                          <span>{displayName}</span>
                        </BreadcrumbLink>
                      </Link>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="dark-mode"
          checked={theme === "light"}
          onCheckedChange={handleToggle}
        />
        <Label htmlFor="dark-mode">
          {theme === "light" ? "Dark" : "Light"} Mode
        </Label>
      </div>
    </header>
  );
};

export default Header;
