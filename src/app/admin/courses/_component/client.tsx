"use client";

import React from "react";
import { columns, CourseColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetCourses } from "@/data/courses";

const CourseClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: courseData, error, isLoading } = useGetCourses();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: CourseColumn[] =
  courseData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      unit: item.unit,
      preRequisite: item.prerequisite || "N/A",
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

export default CourseClient;
