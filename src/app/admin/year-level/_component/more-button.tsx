/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Ellipsis } from "lucide-react";
import {
  IconFileDescription,
  IconFileExcel,
  IconImageInPicture,
  IconPrinter,
} from "@tabler/icons-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getAllYearLevel } from "@/actions/year-level";
import { Button } from "@/components/ui/button";
import { Sections, Students, YearLevels } from "@prisma/client";

interface MoreButtonProps extends YearLevels {
  students: Students[];
  sections: Sections[];
}

const MoreButton = () => {
  const [data, setData] = useState<MoreButtonProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllYearLevel();
      if (response.data) {
        setData(
          response.data.map((item: any) => ({
            ...item,
            students: item.student,
            sections: item.section,
          }))
        );
      } else {
        console.error(response.error || "Failed to fetch data.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const generateFileName = (extension: string) => {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
    return `year-level_${timestamp}.${extension}`;
  };

  const renderTableHTML = () => {
    return `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Year Level</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Students</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Sections</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.students.length}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.sections.length}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  };

  const handleSaveAsImage = async () => {
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.innerHTML = renderTableHTML();
    document.body.appendChild(tempContainer);

    const canvas = await html2canvas(tempContainer);
    const imgData = canvas.toDataURL("image/png");

    document.body.removeChild(tempContainer);

    const link = document.createElement("a");
    link.href = imgData;
    link.download = generateFileName("png");
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableHTML = renderTableHTML();

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
        <body>${tableHTML}</body>
      </html>
    `);
    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  };

  const handleExportAsPDF = async () => {
    const pdf = new jsPDF("p", "pt", "a4");
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.innerHTML = renderTableHTML();
    document.body.appendChild(tempContainer);

    const canvas = await html2canvas(tempContainer, {
      scale: 2, // Increase scale for better resolution
    });
    const imgData = canvas.toDataURL("image/png");
    document.body.removeChild(tempContainer);

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

    pdf.save(generateFileName("pdf"));
  };

  console.log(renderTableHTML());

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
        <DropdownMenuItem onClick={handlePrint} disabled={loading}>
          <IconPrinter className="w-4 h-4" />
          Print Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportAsPDF} disabled={loading}>
          <IconFileDescription className="w-4 h-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSaveAsImage} disabled={loading}>
          <IconImageInPicture className="w-4 h-4" />
          Save as Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;
