"use client";

import React from "react";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { ProgramColumn } from "./column";
import { format } from "date-fns";
import { useGetProgram } from "@/data/programs";

const ProgramClient = () => {
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

export default ProgramClient;
