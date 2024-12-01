/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { IconCirclePlus, IconFileExcel } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import YearLevelForm from "@/components/forms/year-level-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { createBulkYearLevel } from "@/actions/year-level";
import MoreButton from "./more-button";

const TableHeader = ({
  label,
  href,
}: {
  label: string;
  href?: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openYearLevelModal, setOpenYearLevelModal] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
            await createBulkYearLevel(json);
            toast.success("Data processed successfully");
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Year Level Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different year levels and
          monitor their academic progress.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <input
            className="hidden"
            id="file_input"
            type="file"
            ref={fileInputRef}
            accept=".xls,.xlsx"
            onChange={handleFileChange}
          />
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            variant="secondary"
            className="h-7 gap-1"
            size="sm"
          >
            <IconFileExcel className="w-4 h-4" />
            Import from Excel
          </Button>
        </div>
        <MoreButton />
        <Button
          onClick={() =>
            href ? router.push(href) : setOpenYearLevelModal(true)
          }
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span>{label}</span>
        </Button>
      </div>
      {openYearLevelModal && (
        <YearLevelForm
          isOpen={openYearLevelModal}
          initialData={null}
          onClose={() => setOpenYearLevelModal(false)}
        />
      )}
    </div>
  );
};

export default TableHeader;
