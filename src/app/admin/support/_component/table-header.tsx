"use client";

import React, { useEffect, useState } from "react";

const TableHeader = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Support Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different year levels and
          monitor their academic progress.
        </p>
      </div>
    </div>
  );
};

export default TableHeader;
