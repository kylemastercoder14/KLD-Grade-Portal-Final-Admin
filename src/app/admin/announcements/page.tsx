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
import { getAllAnnouncements } from "@/actions/announcement";
import AnnouncementClient from "./_component/client";

const Announcements = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["announcements"],
    queryFn: getAllAnnouncements,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <TableHeader label="Add Announcement" />
      <Card>
        <CardHeader>
          <CardTitle>Announcement Record</CardTitle>
          <CardDescription>
            Here you can manage all announcements, including adding new ones and
            viewing existing records. Please ensure that the information
            provided is accurate and up-to-date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <AnnouncementClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcements;
