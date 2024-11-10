"use client";

import React, { useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, StudentColumn } from "./column";
import { useGeStudent } from "@/data/student";
import TableHeader from "./table-header";
import { useGetProgram } from "@/data/programs";

const StudentClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const {
    data: studentData,
    error: studentError,
    isLoading: studentLoading,
  } = useGeStudent();
  const {
    data: programData,
    error: programError,
    isLoading: programLoading,
  } = useGetProgram();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (studentError || programError) {
      toast.error(
        studentError?.message || programError?.message || "An error occurred"
      );
    }
  }, [studentError, programError]);

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
          filterColumn="programId"
          filterValues={programData?.data?.map((item) => item.name)}
          loading={studentLoading || programLoading}
          searchKey="name"
          columns={columns}
          data={formattedData}
        />
      </div>
    </div>
  );
};

export default StudentClient;
