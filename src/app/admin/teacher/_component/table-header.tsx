/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { RefObject, useRef, useState } from "react";
import { IconCirclePlus, IconFileExcel } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MoreButton from "@/app/admin/year-level/_component/more-button";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { createBulkStudents } from "@/actions/student";
import { createBulkTeachers } from "@/actions/teacher";
import { Loader2 } from "lucide-react";

const TableHeader = ({
  label,
  href,
  tableRef,
}: {
  label: string;
  href?: string;
  tableRef: RefObject<HTMLTableElement>;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);
          try {
            const response = await createBulkTeachers(json);
            if (response?.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
            }
          } catch (error) {
            console.error("Error processing file:", error);
            toast.error("Failed to process data. Please try again.");
          }
          setLoading(false);
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  return (
    <>
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
          <div>
            <p className="text-xl font-bold">Teacher Record</p>
            <p className="text-sm text-muted-foreground">
              A comprehensive list of all teachers, including their contact
              information, and status. Manage and review individual teacher
              records efficiently.
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
            <MoreButton tableRef={tableRef} />
            <Button
              onClick={() => href && router.push(href)}
              size="sm"
              className="h-7 gap-1"
            >
              <IconCirclePlus className="h-3.5 w-3.5" />
              <span>{label}</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableHeader;
