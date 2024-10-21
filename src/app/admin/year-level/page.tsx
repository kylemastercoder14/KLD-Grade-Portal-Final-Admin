import { getAllYearLevel } from "@/actions/year-level";
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
import YearLevelClient from "./_component/client";
import TableHeader from "./_component/table-header";

const YearLevel = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["yearLevels"],
    queryFn: getAllYearLevel,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <TableHeader label="Add Year Level" />
      <Card>
        <CardHeader>
          <CardTitle>Year Level Record</CardTitle>
          <CardDescription>
            Keep track of student distribution across different year levels and
            monitor their academic progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <YearLevelClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default YearLevel;
