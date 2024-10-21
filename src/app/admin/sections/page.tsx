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
import SectionClient from "./_component/client";
import TableHeader from "./_component/table-header";
import { getAllSections } from "@/actions/sections";
import { getAllPrograms } from "@/actions/programs";
import { getAllYearLevel } from "@/actions/year-level";

const Sections = async () => {
  const queryClient = new QueryClient();

  // Prefetch the data from the server
  await queryClient.prefetchQuery({
    queryKey: ["sections"],
    queryFn: getAllSections,
  });

  await queryClient.prefetchQuery({
    queryKey: ["programs"],
    queryFn: getAllPrograms,
  });

  await queryClient.prefetchQuery({
    queryKey: ["yearLevels"],
    queryFn: getAllYearLevel,
  });

  // Hydrate the query data for the client
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <TableHeader label="Add Section" />
        <Card>
          <CardHeader>
            <CardTitle>Section Record</CardTitle>
            <CardDescription>
              Keep track of student distribution across different sections and
              monitor their academic progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SectionClient />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Sections;
