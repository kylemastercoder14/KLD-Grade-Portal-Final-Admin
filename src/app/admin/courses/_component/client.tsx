"use client";

import React from "react";
import { columns, CourseColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { useGetCourses } from "@/data/courses";
import TableHeader from "./table-header";

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
    courseData?.data?.map((item) => {
      const preRequisite = courseData?.data?.find(
        (course) => course.id === item.prerequisite
      );

      return {
        id: item.id,
        name: item.name.toUpperCase(),
        code: item.code,
        unit: item.unit,
        preRequisite: preRequisite ? preRequisite.name : "N/A",
        preRequisiteId: item.prerequisite || "N/A",
        createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
      };
    }) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader label="Add Course" />
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default CourseClient;
