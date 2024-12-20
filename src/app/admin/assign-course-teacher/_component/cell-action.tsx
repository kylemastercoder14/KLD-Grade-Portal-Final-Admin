"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { AssignCourseTeacherColumn } from "./column";
import { useGetTeacher } from "@/data/teacher";
import { useGetSection } from "@/data/sections";
import { useGetCourses } from "@/data/courses";
import { useDeleteAssignCourseTeacher } from "@/data/assign-course-teacher";
import AssignCourseTeacherForm from "@/components/forms/assign-course-teacher-form ";
import PasskeyModal from "@/components/globals/passkey-modal";

interface CellActionProps {
  data: AssignCourseTeacherColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [otp, setOtp] = useState("");
  const { data: sectionData, error: sectionError } = useGetSection();
  const { data: teacherData, error: teacherError } = useGetTeacher();
  const { data: courseData, error: courseError } = useGetCourses();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [initialData, setInitialData] =
    useState<AssignCourseTeacherColumn | null>(null);
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  useEffect(() => {
    if (teacherError || sectionError || courseError) {
      toast.error(
        teacherError?.message ||
          sectionError?.message ||
          courseError?.message ||
          "An error occurred"
      );
    }
  }, [teacherError, sectionError, courseError]);

  const { mutate: deleteAssignCourseTeacher, isPending: isDeleting } =
    useDeleteAssignCourseTeacher();

  const onDelete = async () => {
    if (otp !== "111111") {
      toast.error("Invalid passkey");
      return;
    }
    deleteAssignCourseTeacher(data.id, {
      onSuccess: () => {
        window.location.reload();
        setOpen(false);
      },
    });
  };

  const onUpdate = () => {
    setInitialData(data);
    setFormOpen(true);
  };

  const sectionOptions = (sectionData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const teacherOptions = (teacherData?.data ?? []).map((item) => ({
    label: item.firstName + " " + item.lastName,
    value: item.id,
  }));

  const courseOption = (courseData?.data ?? []).map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <>
      <PasskeyModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          window.location.reload();
          toast.success("Delete cancelled");
        }}
        loading={isDeleting}
        onConfirm={onDelete}
        title="Delete Course Teacher"
        description="Are you sure you want to delete this course teacher? This action cannot be undone."
        setOtp={setOtp}
      />
      {formOpen && (
        <AssignCourseTeacherForm
          course={courseOption}
          section={sectionOptions}
          teacher={teacherOptions}
          initialData={initialData}
          onClose={() => {
            setFormOpen(false);
            window.location.reload();
          }}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="no-print" asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.name)}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
