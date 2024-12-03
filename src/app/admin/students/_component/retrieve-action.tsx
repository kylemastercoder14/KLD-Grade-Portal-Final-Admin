"use client";

import React, { useState } from "react";
import { StudentColumn1 } from "./column";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import PasskeyModal from "@/components/globals/passkey-modal";
import { useRetrieveStudent } from "@/data/student";

interface CellActionProps {
  data: StudentColumn1;
}

export const RetrieveAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const { mutate: retrieveStudent, isPending: isDeleting } =
    useRetrieveStudent();

  const onDelete = async () => {
    if (otp !== "111111") {
      toast.error("Invalid passkey");
      return;
    }
    retrieveStudent(data.id, {
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
          toast.success("Retrieve cancelled");
        }}
        loading={isDeleting}
        onConfirm={onDelete}
        title="Retrieve Student"
        description="Are you sure you want to retrieve this student? This action cannot be undone."
        setOtp={setOtp}
      />
      <Button size="sm" onClick={() => setOpen(true)}>
        <RefreshCw className="w-4 h-4" />
        Retrieve
      </Button>
    </>
  );
};

export default RetrieveAction;
