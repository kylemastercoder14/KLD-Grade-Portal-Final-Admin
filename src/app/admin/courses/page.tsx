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
import CourseClient from "./_component/client";
import { getAllCourses } from "@/actions/courses";
import GreetingsHeader from "@/components/globals/greetings-header";

const Courses = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <GreetingsHeader />
        <Card>
          <CardContent>
            <CourseClient />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Courses;
