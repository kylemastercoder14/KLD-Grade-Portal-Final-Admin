"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "../ui/modal";
import { OtpStyledInput } from "@/components/ui/otp-input";

interface PasskeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description: string;
  setOtp: (otp: string) => void;
}

const PasskeyModal: React.FC<PasskeyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  setOtp,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [otp, setOtpState] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleOtpChange = (value: string) => {
    setOtpState(value);
    setOtp(value);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <OtpStyledInput numInputs={6} value={otp} onChange={handleOtpChange} />
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading || otp.length !== 6}
          variant="destructive"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default PasskeyModal;
