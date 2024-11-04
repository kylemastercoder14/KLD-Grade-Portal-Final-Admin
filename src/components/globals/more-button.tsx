/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import {
  IconFileDescription,
  IconFileExcel,
  IconImageInPicture,
  IconPrinter,
} from "@tabler/icons-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const MoreButton = ({
  tableRef,
}: {
  tableRef: React.RefObject<HTMLTableElement>;
}) => {

  const handleSaveAsImage = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");

      // Create a link to download the image
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "portal-record.png";
      link.click();
    }
  };

  const handlePrint = () => {
    if (tableRef.current) {
      document
        .querySelectorAll(".no-print")
        .forEach((el) => ((el as HTMLElement).style.display = "none"));
      const printWindow = window.open("", "_blank");
      window.location.reload();
      printWindow?.document.write(`
        <html>
          <head>
            <title>Print Data</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; border: 1px solid #ddd; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>${tableRef.current.outerHTML}</body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handleExportAsPDF = async () => {
    if (tableRef.current) {
      const pdf = new jsPDF("p", "pt", "a4");
      const canvas = await html2canvas(tableRef.current);
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 595.28; // A4 width in points
      const pageHeight = 841.89; // A4 height in points
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("portal-record.pdf");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="secondary" size="sm" className="h-7 gap-1">
          More
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlePrint}>
          <IconPrinter className="w-4 h-4" />
          Print Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportAsPDF}>
          <IconFileDescription className="w-4 h-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSaveAsImage}>
          <IconImageInPicture className="w-4 h-4" />
          Save as Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;
