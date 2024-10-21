"use client";

import React, { useEffect, useState } from "react";
import { IconCirclePlus, IconFileDescription } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProgramForm from "@/components/forms/program-form";

const TableHeader = ({ label, href }: { label: string; href?: string }) => {
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const router = useRouter();
  const [dateInfo, setDateInfo] = useState({
    date: "",
    day: "",
    greeting: "",
  });

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
          onClick={() =>
            href ? router.push(href) : setOpenProgramModal(true)
          }
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {label}
          </span>
        </Button>
      </div>
      {openProgramModal && (
        <ProgramForm
          initialData={null} // Pass any initial data for form, if any
          onClose={() => setOpenProgramModal(false)} // Close the modal when done
        />
      )}
    </div>
  );
};

export default TableHeader;
