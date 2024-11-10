import { Card, CardContent } from "@/components/ui/card";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import GreetingsHeader from "@/components/globals/greetings-header";
import AssignCourseTeacherClient from "./_component/client";
import { getAllAssignCoursTeacher } from "@/actions/assign-course-teacher";

const AssignCourseTeacher = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["assignCourseTeacher"],
    queryFn: getAllAssignCoursTeacher,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <div>
      <GreetingsHeader />
      <Card>
        <CardContent>
          <HydrationBoundary state={dehydratedState}>
            <AssignCourseTeacherClient />
          </HydrationBoundary>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignCourseTeacher;
