"use client";

import React from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { useGetYearLevel } from "@/data/year-level";
import { YearLevelColumn } from "./column";
import { format } from "date-fns";
import TableHeader from "./table-header";

const YearLevelClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: yearLevelData, error, isLoading } = useGetYearLevel();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: YearLevelColumn[] =
    yearLevelData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      students: item.student.length.toString(),
      sections: item.section.length.toString(),
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader label="Add Year Level" />
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default YearLevelClient;
