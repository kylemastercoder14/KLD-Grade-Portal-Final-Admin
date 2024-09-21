"use client";

import React from "react";
import { columns, SectionColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetSection } from "@/data/sections";

const SectionClient = () => {
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

export default SectionClient;
