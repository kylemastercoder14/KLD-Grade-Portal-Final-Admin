"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, columns1, StudentColumn, StudentColumn1 } from "./column";
import { useGetStudent, useGetArchivedStudent } from "@/data/student";
import TableHeader from "./table-header";
import { useGetProgram } from "@/data/programs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const {
    data: studentData,
    error: studentError,
    isLoading: studentLoading,
  } = useGetStudent();
  const {
    data: studentArchivedData,
    error: studentArchivedError,
    isLoading: studentArchivedLoading,
  } = useGetArchivedStudent();
  const {
    data: programData,
    error: programError,
    isLoading: programLoading,
  } = useGetProgram();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (studentError || programError || studentArchivedError) {
      toast.error(
        studentError?.message ||
          programError?.message ||
          studentArchivedError?.message ||
          "An error occurred"
      );
    }
  }, [studentError, programError, studentArchivedError]);

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
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  const formattedDataArchived: StudentColumn1[] =
    studentArchivedData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      studentId: item.studentNumber,
      programId: item.programs?.name,
      yearLevelId: item.yearLevels?.name,
      sectionId: item.sections?.name,
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader href="/admin/students/new" label="Add Student" />
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Students</TabsTrigger>
          <TabsTrigger value="archived">Archived Students</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <DataTable
            filterColumn="programId"
            filterValues={programData?.data?.map((item) => item.name)}
            loading={studentLoading || programLoading}
            searchKey="name"
            columns={columns}
            data={formattedData}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            filterColumn="programId"
            filterValues={programData?.data?.map((item) => item.name)}
            loading={studentArchivedLoading || programLoading}
            searchKey="name"
            columns={columns1}
            data={formattedDataArchived}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentClient;
