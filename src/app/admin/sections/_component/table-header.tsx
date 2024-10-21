"use client";

import React, { useEffect, useState } from "react";
import { IconCirclePlus, IconFileDescription } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionForm from "@/components/forms/section-form";
import { useGetProgram } from "@/data/programs";
import { useGetYearLevel } from "@/data/year-level";
import { toast } from "sonner";

const TableHeader = ({ label, href }: { label: string; href?: string }) => {
  const { data: programData, error: programError } = useGetProgram();
  const { data: yearLevelData, error: yearLevelError } = useGetYearLevel();
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const router = useRouter();
  const [dateInfo, setDateInfo] = useState({
    date: "",
    day: "",
    greeting: "",
  });

  React.useEffect(() => {
    if (programError || yearLevelError) {
      toast.error(
        programError?.message || yearLevelError?.message || "An error occurred"
      );
    }
  }, [programError, yearLevelError]);

  useEffect(() => {
    // Function to update date, day, and greeting
    const updateDateInfo = () => {
      const now = new Date();

      // Format the date
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const formattedDate = now.toLocaleDateString(undefined, dateOptions);

      // Get the current day
      const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
      const formattedDay = now.toLocaleDateString(undefined, dayOptions);

      // Determine the greeting based on the current time
      const hour = now.getHours();
      let greeting = "";

      if (hour < 12) {
        greeting = "Good Morning";
      } else if (hour < 18) {
        greeting = "Good Afternoon";
      } else {
        greeting = "Good Evening";
      }

      // Set the state with updated values
      setDateInfo({
        date: formattedDate,
        day: formattedDay,
        greeting: greeting,
      });
    };

    updateDateInfo();

    // Optional: Update every minute to keep it dynamic
    const intervalId = setInterval(updateDateInfo, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const yearLevelOptions = (yearLevelData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const programOptions = (programData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
    code: item.code,
  }));

  return (
    <div className="flex items-center mb-5 justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          {dateInfo.day}, {dateInfo.date}
        </p>
        <p className="text-lg font-bold">
          {dateInfo.greeting}, Victoria Balbio! 👋
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-7 gap-1">
          <IconFileDescription className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export CSV
          </span>
        </Button>
        <Button
          onClick={() => (href ? router.push(href) : setOpenSectionModal(true))}
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {label}
          </span>
        </Button>
      </div>
      {openSectionModal && (
        <SectionForm
          programData={programOptions}
          yearLevelData={yearLevelOptions}
          initialData={null} // Pass any initial data for form, if any
          onClose={() => setOpenSectionModal(false)} // Close the modal when done
        />
      )}
    </div>
  );
};

export default TableHeader;
