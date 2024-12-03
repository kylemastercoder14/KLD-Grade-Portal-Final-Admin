"use client";

import React from "react";
import { columns, RequestedDocumentsColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetRequestedDocuments } from "@/data/requested-document";

const RequestedDocumentClient = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const {
    data: requestedDocument,
    error,
    isLoading,
  } = useGetRequestedDocuments();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: RequestedDocumentsColumn[] =
    requestedDocument?.data?.map((item) => ({
      id: item.id,
      student: item.student.firstName + " " + item.student.lastName,
      studentNumber: item.student.studentNumber,
      purpose: item.purpose,
      status: item.status,
      type: item.typeDocument,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader label="Add Requested Document" />
      <DataTable
        loading={isLoading}
        searchKey="name"
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default RequestedDocumentClient;
