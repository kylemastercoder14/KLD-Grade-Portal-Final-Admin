/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useState } from "react";
import { IconCirclePlus, IconFileExcel } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProgramForm from "@/components/forms/program-form";
import { createBulkPrograms } from "@/actions/programs";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import MoreButton from "./more-button";

const TableHeader = ({ label, href }: { label: string; href?: string }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      previewAndSaveData(selectedFile);
    }
  };

  const previewAndSaveData = async (file: File) => {
    if (file) {
      toast.info("Processing file, please wait...");
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);
          try {
            await createBulkPrograms(json);
            toast.success("Data processed successfully");
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Requested Document Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of requested documents, ensuring efficient management and
          monitoring to streamline processing and maintain accurate records.
        </p>
      </div>
      {openProgramModal && (
        <ProgramForm
          isOpen={openProgramModal} // Pass the state to open the modal
          initialData={null} // Pass any initial data for form, if any
          onClose={() => setOpenProgramModal(false)} // Close the modal when done
        />
      )}
    </div>
  );
};

export default TableHeader;
