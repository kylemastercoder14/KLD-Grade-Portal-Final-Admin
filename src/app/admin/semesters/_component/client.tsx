"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetSemester } from "@/data/semester";
import { columns, SemesterColumn } from "./column";

const SemesterClient = () => {
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
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </>
  );
};

export default SemesterClient;
