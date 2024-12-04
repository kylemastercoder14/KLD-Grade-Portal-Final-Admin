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
import { CheckCheck, Copy, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import PasskeyModal from "@/components/globals/passkey-modal";
import { useConfirmSupport, useDeleteSupport } from "@/data/support";
import AlertModal from "@/components/ui/alert-modal";
import { SupportColumn } from "./column";

interface CellActionProps {
  data: SupportColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const onCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success("Data copied to the clipboard");
  };

  const { mutate: deleteSupport, isPending: isDeleting } = useDeleteSupport();

  const { mutate: confirmSupport, isPending: isConfirming } =
    useConfirmSupport();

  const onDelete = async () => {
    if (otp !== "111111") {
      toast.error("Invalid passkey");
      return;
    }
    deleteSupport(data.id, {
      onSuccess: () => {
        setOpen(false);
        window.location.reload();
      },
    });
  };

  const onConfirm = async () => {
    confirmSupport(data.id, {
      onSuccess: () => {
        setFormOpen(false);
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
        title="Delete Year Level"
        description="Are you sure you want to delete this year level? This action cannot be undone."
        setOtp={setOtp}
      />
      <AlertModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onConfirm={onConfirm}
        title="Are you sure you want to complete this support? This action cannot be undone."
        loading={isConfirming}
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="no-print" asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {data.status === "Pending" && (
            <DropdownMenuItem onClick={() => setFormOpen(true)}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark as Complete
            </DropdownMenuItem>
          )}
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
