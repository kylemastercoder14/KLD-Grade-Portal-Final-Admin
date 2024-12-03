"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import { columns, columns1, TeacherColumn, TeacherColumn1 } from "./column";
import TableHeader from "./table-header";
import { useGetArchivedTeacher, useGetTeacher } from "@/data/teacher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeacherClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const {
    data: teacherData,
    error: teacherError,
    isLoading: teacherLoading,
  } = useGetTeacher();
  const {
    data: archivedTeacherData,
    error: archivedTeacherError,
    isLoading: archivedTeacherLoading,
  } = useGetArchivedTeacher();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (teacherError || archivedTeacherError) {
      toast.error(
        teacherError?.message ||
          archivedTeacherError?.message ||
          "An error occurred"
      );
    }
  }, [teacherError, archivedTeacherError]);

  const formattedData: TeacherColumn[] =
    teacherData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      employeeId: item.employeeId,
      position: item.position,
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  const formattedDataArchived: TeacherColumn1[] =
    archivedTeacherData?.data?.map((item) => ({
      id: item.id,
      name: item.firstName + " " + item.lastName,
      employeeId: item.employeeId,
      position: item.position,
      email: item.email,
      imageUrl: item.profileImage ?? "",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader href="/admin/teacher/new" label="Add Teacher" />
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Teachers</TabsTrigger>
          <TabsTrigger value="archived">Archived Teachers</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <DataTable
            loading={teacherLoading}
            searchKey="name"
            columns={columns}
            data={formattedData}
          />
        </TabsContent>
        <TabsContent value="archived">
          <DataTable
            loading={archivedTeacherLoading}
            searchKey="name"
            columns={columns1}
            data={formattedDataArchived}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherClient;
