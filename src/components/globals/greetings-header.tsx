"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const GreetingsHeader = () => {
  const [dateInfo, setDateInfo] = useState({
    date: "",
    day: "",
    greeting: "",
  });

  const [loading, setLoading] = useState(true);

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

      setLoading(false);
    };

    updateDateInfo();

    // Optional: Update every minute to keep it dynamic
    const intervalId = setInterval(updateDateInfo, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" size={100} />
      </div>
    );
  }

  return (
    <div className="flex items-center mb-5 justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          {dateInfo.day}, {dateInfo.date}
        </p>
        <p className="text-lg font-bold">
          {dateInfo.greeting}, Administrator 👋
        </p>
      </div>
    </div>
  );
};

export default GreetingsHeader;
