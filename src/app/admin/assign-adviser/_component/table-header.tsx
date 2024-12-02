"use client";

import React, { useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AssignAdviserForm from "@/components/forms/assign-form";
import { useGetTeacher } from "@/data/teacher";
import { useGetSection } from "@/data/sections";
import { toast } from "sonner";
import MoreButton from "./more-button";

const TableHeader = ({ label, href }: { label: string; href?: string }) => {
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
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Adviser Record</p>
        <p className="text-sm text-muted-foreground">
          Manage and track grades for students across various subjects. This
          table provides an overview of student grades and allows adding or
          updating grades for each student.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MoreButton />
        <Button
          onClick={() => (href ? router.push(href) : setOpenModal(true))}
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span>{label}</span>
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
