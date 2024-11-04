"use client";

import React, { RefObject, useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import YearLevelForm from "@/components/forms/year-level-form";
import MoreButton from "@/components/globals/more-button";

const TableHeader = ({ label, href, tableRef }: { label: string; href?: string; tableRef: RefObject<HTMLTableElement>; }) => {
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
    <div className="flex items-center mb-5 mt-5 justify-between">
      <div>
        <p className="text-xl font-bold">Year Level Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different year levels and
          monitor their academic progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
        <Button
          onClick={() =>
            href ? router.push(href) : setOpenYearLevelModal(true)
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
