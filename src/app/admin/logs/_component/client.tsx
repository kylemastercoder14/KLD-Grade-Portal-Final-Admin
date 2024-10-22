"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, LogColumn } from "./column";
import { useGetLogs } from "@/data/logs";

const LogsClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: logsData, error, isLoading } = useGetLogs();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: LogColumn[] =
    logsData?.data?.map((item) => ({
      id: item.id,
      action: item.action,
      createdAt: format(item.createdAt, "MMMM dd, yyyy - hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DataTable
        loading={isLoading}
        searchKey="createdAt"
        columns={columns}
        data={formattedData}
      />
    </>
  );
};

export default LogsClient;
