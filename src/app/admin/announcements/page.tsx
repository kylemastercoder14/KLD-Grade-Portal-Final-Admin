import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getAllAnnouncements } from "@/actions/announcement";
import AnnouncementClient from "./_component/client";
import GreetingsHeader from "@/components/globals/greetings-header";

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
      <GreetingsHeader />
      <Card>
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
