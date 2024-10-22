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
import { getAllLogs } from "@/actions/logs";
import LogsClient from "./_component/client";

const Logs = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["logs"],
    queryFn: getAllLogs,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <TableHeader />
      <Card>
        <CardHeader>
          <CardTitle>Logs Record</CardTitle>
          <CardDescription>
            View a detailed record of system activities, including user actions,
            changes, and important events. Logs provide valuable insights for
            monitoring system behavior and ensuring accountability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <LogsClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
