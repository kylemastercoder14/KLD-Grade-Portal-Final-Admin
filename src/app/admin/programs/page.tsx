import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import { getAllPrograms } from "@/actions/programs";
import ProgramClient from "./_component/client";
import GreetingsHeader from "@/components/globals/greetings-header";

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
      <GreetingsHeader />
      <Card>
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
