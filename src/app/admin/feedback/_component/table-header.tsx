"use client";

import React, { RefObject, useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import YearLevelForm from "@/components/forms/year-level-form";
import MoreButton from "@/components/globals/more-button";

const TableHeader = ({ tableRef }: { tableRef: RefObject<HTMLTableElement>; }) => {
  const [openYearLevelModal, setOpenYearLevelModal] = useState(false);
  const router = useRouter();
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
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
      </div>
      {openYearLevelModal && (
        <YearLevelForm
          initialData={null}
          onClose={() => setOpenYearLevelModal(false)}
        />
      )}
    </div>
  );
};

export default TableHeader;
