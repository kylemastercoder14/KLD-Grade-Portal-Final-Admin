/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useState } from "react";
import { IconCirclePlus, IconFileExcel } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CourseForm from "@/components/forms/course-form";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { createBulkCourses } from "@/actions/courses";
import MoreButton from "./more-button";

const TableHeader = ({ label, href }: { label: string; href?: string }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openCourseModal, setOpenCourseModal] = useState(false);
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
            await createBulkCourses(json);
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
        <p className="text-xl font-bold">Course Record</p>
        <p className="text-sm text-muted-foreground ">
          Keep track of student distribution across different courses/subjects
          and monitor their academic progress.
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
          onClick={() => (href ? router.push(href) : setOpenCourseModal(true))}
          size="sm"
          className="h-7 gap-1"
        >
          <IconCirclePlus className="h-3.5 w-3.5" />
          <span>{label}</span>
        </Button>
      </div>
      {openCourseModal && (
        <CourseForm
          isOpen={openCourseModal} // Open the modal
          initialData={null} // Pass any initial data for form, if any
          onClose={() => setOpenCourseModal(false)} // Close the modal when done
        />
      )}
    </div>
  );
};

export default TableHeader;
