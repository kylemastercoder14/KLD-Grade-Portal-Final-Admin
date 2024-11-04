"use client";

import React, { RefObject, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProgramForm from "@/components/forms/program-form";
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
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center mb-5 mt-5 justify-between">
      <div>
        <p className="text-xl font-bold">Program Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different programs and
          monitor their academic progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
        <Button
          onClick={() => (href ? router.push(href) : setOpenProgramModal(true))}
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
