"use client";

import React, { useRef } from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, TeacherColumn } from "./column";
import TableHeader from "./table-header";
import { useGetTeacher } from "@/data/teacher";

const TeacherClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: teacherData, error, isLoading } = useGetTeacher();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: TeacherColumn[] =
    teacherData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      employeeId: item.employeeId,
      position: item.position,
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
        href="/admin/teacher/new"
        tableRef={tableRef}
        label="Add Teacher"
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

export default TeacherClient;
