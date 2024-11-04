"use client";

import React, { useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetSemester } from "@/data/semester";
import { columns, SemesterColumn } from "./column";
import TableHeader from "./table-header";

const SemesterClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: semesterData, error, isLoading } = useGetSemester();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: SemesterColumn[] =
    semesterData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      year: item.year,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader label="Add Semester" tableRef={tableRef} />
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

export default SemesterClient;
