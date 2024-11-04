"use client";

import React, { useRef } from "react";
import { columns, AssignAdviserColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetAssignAdviser } from "@/data/assign-adviser";

const AssignAdviserClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: assignAdviserData, error, isLoading } = useGetAssignAdviser();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: AssignAdviserColumn[] =
    assignAdviserData?.data?.map((item) => ({
      id: item.id,
      name: item.teacher.firstName + " " + item.teacher.lastName,
      section: item.section.name,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} label="Assign Adviser" />
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

export default AssignAdviserClient;
