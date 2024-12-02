"use client";

import React, { useRef } from "react";
import { columns, SupportColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { useGetYearLevel } from "@/data/year-level";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetSupport } from "@/data/support";

const SupportClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: supportData, error, isLoading } = useGetSupport();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: SupportColumn[] =
    supportData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      attachment: item.attachment,
      concerns: item.concerns,
      status: item.status,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} />
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

export default SupportClient;
