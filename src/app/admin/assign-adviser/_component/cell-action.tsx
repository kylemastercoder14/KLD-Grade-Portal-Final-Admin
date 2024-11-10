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
import AlertModal from "@/components/ui/alert-modal";
import { AssignAdviserColumn } from "./column";
import AssignAdviserForm from "@/components/forms/assign-form";
import { useGetTeacher } from "@/data/teacher";
import { useGetSection } from "@/data/sections";
import { useDeleteAssignAdviser } from "@/data/assign-adviser";

interface CellActionProps {
  data: AssignAdviserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: sectionData, error: sectionError } = useGetSection();
  const { data: teacherData, error: teacherError } = useGetTeacher();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [initialData, setInitialData] = useState<AssignAdviserColumn | null>(
    null
  );
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  useEffect(() => {
    if (sectionError || teacherError) {
      toast.error(
        sectionError?.message || teacherError?.message || "An error occurred"
      );
    }
  }, [sectionError, teacherError]);

  const { mutate: deleteAssignAdviser, isPending: isDeleting } =
    useDeleteAssignAdviser();

  const onDelete = async () => {
    deleteAssignAdviser(data.id, {
      onSuccess: () => {
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

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isDeleting}
        onConfirm={onDelete}
      />
      {formOpen && (
        <AssignAdviserForm
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
