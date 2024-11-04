"use client";

import React, { useRef } from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { ProgramColumn } from "./column";
import { format } from "date-fns";
import { useGetProgram } from "@/data/programs";
import TableHeader from "./table-header";

const ProgramClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: programData, error, isLoading } = useGetProgram();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: ProgramColumn[] =
    programData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      students: item.student.length.toString(),
      sections: item.section.length.toString(),
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} label="Add Program" />
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

export default ProgramClient;
