
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
import { getAllPrograms } from "@/actions/programs";
import ProgramClient from "./_component/client";
import TableHeader from "./_component/table-header";

const Programs = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["programs"],
    queryFn: getAllPrograms,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <TableHeader label="Add Program" />
      <Card>
        <CardHeader>
          <CardTitle>Program Record</CardTitle>
          <CardDescription>
            Keep track of student distribution across different programs and
            monitor their academic progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <ProgramClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Programs;
