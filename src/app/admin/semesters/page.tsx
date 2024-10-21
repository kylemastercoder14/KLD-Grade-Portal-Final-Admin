
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
import SemesterClient from "./_component/client";
import TableHeader from "./_component/table-header";
import { getAllSemesters } from "@/actions/semester";

const Semester = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["semesters"],
    queryFn: getAllSemesters,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <TableHeader label="Add Semester" />
      <Card>
        <CardHeader>
          <CardTitle>Semester Record</CardTitle>
          <CardDescription>
            Keep track of student distribution across different semester and
            monitor their academic progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <SemesterClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Semester;
