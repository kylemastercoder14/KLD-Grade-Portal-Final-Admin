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
import { CheckCheck, MoreHorizontal, Printer, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteProgram } from "@/data/programs";
import PasskeyModal from "@/components/globals/passkey-modal";
import { RequestedDocumentsColumn } from "./column";
import AlertModal from "@/components/ui/alert-modal";
import { useConfirmDocument } from "@/data/requested-document";

interface CellActionProps {
  data: RequestedDocumentsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  const { mutate: deleteProgram, isPending: isDeleting } = useDeleteProgram();
  const { mutate: confirmDocument, isPending: isConfirming } =
    useConfirmDocument();

  const onDelete = async () => {
    if (otp !== "111111") {
      toast.error("Invalid passkey");
      return;
    }
    deleteProgram(data.id, {
      onSuccess: () => {
        setOpen(false);
        window.location.reload();
      },
    });
  };

  const onConfirm = async () => {
    confirmDocument(data.id, {
      onSuccess: () => {
        setConfirmOpen(false);
        window.location.reload();
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
          toast.success("Delete cancelled");
        }}
        loading={isDeleting}
        onConfirm={onDelete}
        title="Delete Program"
        description="Are you sure you want to delete this program? This action cannot be undone."
        setOtp={setOtp}
      />
      <AlertModal
        onConfirm={onConfirm}
        loading={isConfirming}
        title="Are you sure you want to confirm this document?"
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
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
          {data.status === "Pending" && (
            <DropdownMenuItem onClick={() => setConfirmOpen(true)}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Confirm
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onCopy(data.studentNumber)}>
            <Printer className="w-4 h-4 mr-2" />
            Print
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
