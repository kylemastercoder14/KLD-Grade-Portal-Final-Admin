"use client";

import { Button } from "@/components/ui/button";
import { SectionColumn } from "./column";

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
import { useEffect, useState } from "react";
import AlertModal from "@/components/ui/alert-modal";
import { useGetProgram } from "@/data/programs";
import SectionForm from "@/components/forms/section-form";
import { useGetYearLevel } from "@/data/year-level";
import { useDeleteSection } from "@/data/sections";

interface CellActionProps {
  data: SectionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: programData, error: programError } = useGetProgram();
  const { data: yearLevelData, error: yearLevelError } = useGetYearLevel();
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [initialData, setInitialData] = useState<SectionColumn | null>(null);
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  useEffect(() => {
    if (programError || yearLevelError) {
      toast.error(
        programError?.message || yearLevelError?.message || "An error occurred"
      );
    }
  }, [programError, yearLevelError]);

  const { mutate: deleteSection, isPending: isDeleting } = useDeleteSection();

  const onDelete = async () => {
    deleteSection(data.id, {
      onSuccess: () => {
        setOpen(false);
        window.location.reload();
      },
    });
  };

  const onUpdate = () => {
    setInitialData(data);
    setFormOpen(true);
  };

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
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={isDeleting}
        onConfirm={onDelete}
      />
      {formOpen && (
        <SectionForm
          programData={programOptions}
          yearLevelData={yearLevelOptions}
          initialData={initialData}
          onClose={() => setFormOpen(false)}
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
