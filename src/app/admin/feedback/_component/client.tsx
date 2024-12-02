"use client";

import React, { useRef } from "react";
import { columns, FeedbackColumn } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import { format } from "date-fns";
import TableHeader from "./table-header";
import { useGetSupport } from "@/data/support";
import { useGetFeedback } from "@/data/feedback";

const FeedbackClient = () => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const { data: feedbackData, error, isLoading } = useGetFeedback();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred");
    }
  }, [error]);

  const formattedData: FeedbackColumn[] =
    feedbackData?.data?.map((item) => ({
      id: item.id,
      name: item.name,
      comment: item.comment || "N/A",
      feedback: item.feedback,
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <TableHeader tableRef={tableRef} />
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

export default FeedbackClient;
