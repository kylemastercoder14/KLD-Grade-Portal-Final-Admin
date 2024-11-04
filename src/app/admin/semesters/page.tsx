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
import SemesterClient from "./_component/client";
import { getAllSemesters } from "@/actions/semester";
import GreetingsHeader from "@/components/globals/greetings-header";

const Semester = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["semesters"],
    queryFn: getAllSemesters,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <GreetingsHeader />
        <Card>
          <CardContent>
            <SemesterClient />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Semester;
