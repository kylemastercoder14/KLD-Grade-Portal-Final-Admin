"use client";

import React, { RefObject, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MoreButton from "@/components/globals/more-button";
import AssignAdviserForm from "@/components/forms/assign-form";
import { useGetTeacher } from "@/data/teacher";
import { useGetSection } from "@/data/sections";
import { toast } from "sonner";

const TableHeader = ({
  label,
  href,
  tableRef,
}: {
  label: string;
  href?: string;
  tableRef: RefObject<HTMLTableElement>;
}) => {
  const { data: teacherData, error: teacherError } = useGetTeacher();
  const { data: sectionData, error: sectionError } = useGetSection();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (teacherError || sectionError) {
      toast.error(
        teacherError?.message || sectionError?.message || "An error occurred"
      );
    }
  }, [teacherError, sectionError]);

  const teacherOption = (teacherData?.data ?? []).map((item) => ({
    label: item.firstName + " " + item.lastName,
    value: item.id,
  }));

  const sectionOption = (sectionData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="flex items-center mb-5 mt-5 justify-between">
      <div>
        <p className="text-xl font-bold">Adviser Record</p>
        <p className="text-sm text-muted-foreground">
          Manage and assign advisers to students or projects. This table
          provides an overview of adviser assignments and allows adding new
          assignments.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton tableRef={tableRef} />
        <Button
          onClick={() => (href ? router.push(href) : setOpenModal(true))}
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {label}
          </span>
        </Button>
      </div>
      {openModal && (
        <AssignAdviserForm
          initialData={null}
          teacher={teacherOption}
          section={sectionOption}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default TableHeader;
