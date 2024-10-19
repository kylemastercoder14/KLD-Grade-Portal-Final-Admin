import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import TableHeader from "./_component/table-header";
import { getAllStudents } from "@/actions/student";
import StudentClient from "./_component/client";

const Student = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <TableHeader href="/admin/students/new" label="Add Student" />
      <Card>
        <CardHeader>
          <CardTitle>Student Record</CardTitle>
          <CardDescription>
            A comprehensive list of all students, including their academic
            details, contact information, and status. Manage and review
            individual student records efficiently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <StudentClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Student;
