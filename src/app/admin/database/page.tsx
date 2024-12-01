import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import { getAllBackupDatabase } from "@/actions/backup_database";
import BackupDatabaseClient from "./_components/client";

const BackupDatabase = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["backupDatabase"],
    queryFn: getAllBackupDatabase,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <GreetingsHeader />
        <Card>
          <CardContent>
            <HydrationBoundary state={dehydratedState}>
              <BackupDatabaseClient />
            </HydrationBoundary>
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default BackupDatabase;
