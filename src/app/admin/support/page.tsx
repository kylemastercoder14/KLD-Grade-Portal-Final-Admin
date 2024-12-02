
import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import { getAllSupport } from "@/actions/support";
import SupportClient from "./_component/client";

const Support = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["support"],
    queryFn: getAllSupport,
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
              <SupportClient />
            </HydrationBoundary>
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Support;
