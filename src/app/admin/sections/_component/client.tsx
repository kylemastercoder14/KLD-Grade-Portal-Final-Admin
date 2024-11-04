"use client";

import React, { useRef } from "react";
import { columns, SectionColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetSection } from "@/data/sections";
import TableHeader from "./table-header";

const SectionClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: sectionData, error, isLoading } = useGetSection();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: SectionColumn[] =
    sectionData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      yearLevel: item.yearLevels.name,
      yearLevelId: item.yearLevels.id,
      programId: item.programs.id,
      students: item.student.length.toString(),
      programs: item.programs.name,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} label="Add Section" />
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

export default SectionClient;
