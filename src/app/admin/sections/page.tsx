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
import SectionClient from "./_component/client";
import { getAllSections } from "@/actions/sections";
import { getAllPrograms } from "@/actions/programs";
import { getAllYearLevel } from "@/actions/year-level";
import GreetingsHeader from "@/components/globals/greetings-header";

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
        <GreetingsHeader />
        <Card>
          <CardContent>
            <SectionClient />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default Sections;
