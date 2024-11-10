"use client";

import React, { useRef } from "react";
import { columns, AssignCourseTeacherColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetAssignCourseTeacher } from "@/data/assign-course-teacher";

const AssignCourseTeacherClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: assignCourseTeacherData, error, isLoading } = useGetAssignCourseTeacher();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: AssignCourseTeacherColumn[] =
    assignCourseTeacherData?.data?.map((item) => ({
      id: item.id,
      teacherId: item.teacherId,
      sectionId: item.sectionId,
      name: item.teacher.firstName + " " + item.teacher.lastName,
      course: item.course.name,
      courseId: item.courseId,
      section: item.section.name,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} label="Assign Course Teacher" />
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

export default AssignCourseTeacherClient;
