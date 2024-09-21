import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { Input } from "../ui/input";
import { ModeToggle } from "./mode-toggle";
import NotificationDropdown from "./notification-dropdown";
import UserDropdown from "./user-dropdown";

const Header = () => {
  return (
    <div className="md:flex md:items-center md:justify-between bg-[#f5f5f5] dark:bg-neutral-800 px-10 border-b h-16 w-full hidden">
      <div className="relative flex-1 md:grow-0">
        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <div className="flex items-center">
        <ModeToggle />
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
