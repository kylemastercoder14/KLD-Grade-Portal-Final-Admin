"use client";

import React, { useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, StudentColumn } from "./column";
import { useGeStudent } from "@/data/student";
import TableHeader from "./table-header";

const StudentClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: studentData, error, isLoading } = useGeStudent();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: StudentColumn[] =
    studentData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      studentId: item.studentNumber,
      programId: item.programs?.name,
      yearLevelId: item.yearLevels?.name,
      sectionId: item.sections?.name,
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader
        href="/admin/students/new"
        tableRef={tableRef}
        label="Add Student"
      />
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

export default StudentClient;
