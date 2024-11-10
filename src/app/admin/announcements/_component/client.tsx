"use client";

import React, { useRef } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { AnnouncementColumn } from "./column";
import { format } from "date-fns";
import { useGetAnnouncement } from "@/data/announcement";
import TableHeader from "./table-header";

const AnnouncementClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: announcementData, error, isLoading } = useGetAnnouncement();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: AnnouncementColumn[] =
    announcementData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? "N/A",
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} label="Add Announcement" />
      <div ref={tableRef}>
        <DataTable
          loading={isLoading}
          searchKey="name"
          columns={columns}
          data={formattedData}
        />
      </div>
    </div>
  );
};

export default AnnouncementClient;
