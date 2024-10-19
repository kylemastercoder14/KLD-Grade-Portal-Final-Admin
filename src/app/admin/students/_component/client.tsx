"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, StudentColumn } from "./column";
import { useGeStudent } from "@/data/student";

const StudentClient = () => {
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
      email: item.email,
      imageUrl: item.profileImage ?? "",
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

export default StudentClient;
