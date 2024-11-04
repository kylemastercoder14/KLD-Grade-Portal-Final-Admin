"use client";

import React, { RefObject, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SectionForm from "@/components/forms/section-form";
import { useGetProgram } from "@/data/programs";
import { useGetYearLevel } from "@/data/year-level";
import { toast } from "sonner";
import MoreButton from "@/components/globals/more-button";

const TableHeader = ({
  label,
  href,
  tableRef,
}: {
  label: string;
  href?: string;
  tableRef: RefObject<HTMLTableElement>;
}) => {
  const { data: programData, error: programError } = useGetProgram();
  const { data: yearLevelData, error: yearLevelError } = useGetYearLevel();
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (programError || yearLevelError) {
      toast.error(
        programError?.message || yearLevelError?.message || "An error occurred"
      );
    }
  }, [programError, yearLevelError]);

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
    <div className="flex items-center mb-5 mt-5 justify-between">
      <div>
        <p className="text-xl font-bold">Section Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different sections and
          monitor their academic progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
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
