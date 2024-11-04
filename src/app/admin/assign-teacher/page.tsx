import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import { getAllAssignAdviser } from "@/actions/assign-teacher";
import AssignAdviserClient from "./_component/client";

const AssignTeacher = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["assignAdvisers"],
    queryFn: getAllAssignAdviser,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <AssignAdviserClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignTeacher;
