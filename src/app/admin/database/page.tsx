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

<<<<<<< HEAD
  const handleBackup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/backup");
      if (response.status === 200) {
        const { filePath } = response.data;
        console.log(filePath);
        toast.success(
          `Backup completed successfully! File saved at ${filePath}`
        );
      }
    } catch (error) {
      console.error("Error during backup:", error);
      toast.error("Backup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
=======
  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);
>>>>>>> cc83dd718561eed8c3c2224672cd4fbc1df45ab5

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
