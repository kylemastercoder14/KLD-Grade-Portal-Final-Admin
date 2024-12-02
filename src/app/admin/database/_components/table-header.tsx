/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { RefObject, useEffect, useState } from "react";
import { IconCirclePlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  getAllDataFromDatabase,
  insertBackupDatabase,
} from "@/actions/backup_database";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { uploadBackup } from "@/lib/upload";
import { Loader2 } from "lucide-react";

const TableHeader = ({
  label,
}: {
  label: string;
  tableRef: RefObject<HTMLTableElement>;
}) => {
  const [loading, setLoading] = useState(false);

  const handleAddToExcel = async () => {
    setLoading(true);
    try {
      const response = await getAllDataFromDatabase();

      if (response.error) {
        console.error(response.error);
        return;
      }

      // Initialize a workbook
      const workbook = XLSX.utils.book_new();

      // Iterate through each key in the response and create a sheet
      Object.entries(response).forEach(([sheetName, data]) => {
        if (Array.isArray(data)) {
          // Convert data to a worksheet
          const worksheet = XLSX.utils.json_to_sheet(data);

          // Append the worksheet to the workbook
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
      });

      const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
      const filename = `database_backup_${timestamp}.xlsx`;

      // Write the workbook and create a Blob URL
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      // Create Blob from excelBuffer
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Convert Blob to File
      const file = new File([blob], filename, {
        type: "application/octet-stream",
        lastModified: Date.now(),
      });

      // Upload to S3
      const { url } = await uploadBackup(file, (progress) => {
        console.log(`Upload Progress: ${progress}%`);
      });

      await insertBackupDatabase(url);

      console.log("File uploaded to S3 successfully:", url);
      toast.success(
        "Excel file created, uploaded to S3, and backup completed."
      );
    } catch (error) {
      console.error("Error creating or uploading Excel file:", error);
      toast.error(
        "An error occurred while creating or uploading the Excel file."
      );
    } finally {
      setLoading(false);
    }
  };

  // Check if it's 8 AM every minute and trigger backup
  useEffect(() => {
    const checkTimeForBackup = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
  
      // Log the current time to check if it's correct
      console.log(`Current time: ${hours}:${minutes}`);
  
      // Trigger the backup if it's 8 AM
      if (hours === 8 && minutes === 0) {
        console.log("It's 8 AM! Triggering the backup...");
        handleAddToExcel();
      }
    };
  
    // Check every minute
    const intervalId = setInterval(checkTimeForBackup, 60000);
  
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);
  
  return (
    <div className="flex md:items-center md:flex-row flex-col mb-5 mt-5 gap-2 md:justify-between">
      <div>
        <p className="text-xl font-bold">Backup Database Record</p>
        <p className="text-sm text-muted-foreground ">
          Your database is automatically backed up every day at 8:00 AM to
          ensure your data is safe. If you need to back up your data at any
          time, there's also a button you can click to manually create a backup
          whenever you need it.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          disabled={loading}
          onClick={handleAddToExcel}
          size="sm"
          className="h-7 gap-1"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <IconCirclePlus className="h-3.5 w-3.5" />
          )}
          <span>{label}</span>
        </Button>
      </div>
    </div>
  );
};

export default TableHeader;
