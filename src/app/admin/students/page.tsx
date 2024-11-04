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
import { getAllStudents } from "@/actions/student";
import StudentClient from "./_component/client";
import GreetingsHeader from "@/components/globals/greetings-header";

const Student = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["students"],
    queryFn: getAllStudents,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <StudentClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default Student;
