"use client";

import React, { RefObject, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SemesterForm from "@/components/forms/semester-form";
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
  const [openSemesterModal, setOpenSemesterModal] = useState(false);
  const router = useRouter();

  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Semester Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different semester and
          monitor their academic progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
        <Button
          onClick={() =>
            href ? router.push(href) : setOpenSemesterModal(true)
          }
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span>
            {label}
          </span>
        </Button>
      </div>
      {openSemesterModal && (
        <SemesterForm
          initialData={null} // Pass any initial data for form, if any
          onClose={() => setOpenSemesterModal(false)} // Close the modal when done
        />
      )}
    </div>
  );
};

export default TableHeader;
