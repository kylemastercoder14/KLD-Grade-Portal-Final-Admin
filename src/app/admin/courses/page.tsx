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
import CourseClient from "./_component/client";
import TableHeader from "./_component/table-header";
import { getAllCourses } from "@/actions/courses";

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
        <TableHeader label="Add Course" />
        <Card>
          <CardHeader>
            <CardTitle>Course Record</CardTitle>
            <CardDescription>
              Keep track of student distribution across different courses/subjects and
              monitor their academic progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseClient />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Courses;
