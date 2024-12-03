"use client";

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
import { useState } from "react";
import { StudentColumn } from "./column";
import { useRouter } from "next/navigation";
import PasskeyModal from "@/components/globals/passkey-modal";
import { useArchiveStudent } from "@/data/student";

interface CellActionProps {
  data: StudentColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  const { mutate: archiveStudent, isPending: isDeleting } = useArchiveStudent();

  const onDelete = async () => {
    if (otp !== "111111") {
      toast.error("Invalid passkey");
      return;
    }
    archiveStudent(data.id, {
      onSuccess: () => {
        window.location.reload();
        setOpen(false);
      },
    });
  };

  return (
    <>
      <PasskeyModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          window.location.reload();
          toast.success("Archive cancelled");
        }}
        loading={isDeleting}
        onConfirm={onDelete}
        title="Archive Student"
        description="Are you sure you want to archive this student? This action cannot be undone."
        setOtp={setOtp}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/students/${data.id}`)}
          >
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
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
