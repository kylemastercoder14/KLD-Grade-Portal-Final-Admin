import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import RequestedDocumentClient from "./_component/client";
import { getAllRequestedDocuments } from "@/actions/requested-document";

const RequestedDocuments = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["requested-documents"],
    queryFn: getAllRequestedDocuments,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <RequestedDocumentClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestedDocuments;
