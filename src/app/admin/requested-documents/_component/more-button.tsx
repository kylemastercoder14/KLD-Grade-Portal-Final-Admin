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
import { Button } from "@/components/ui/button";
import { Sections, Students, Programs } from "@prisma/client";
import { getAllPrograms } from "@/actions/programs";
import { format } from "date-fns";

interface MoreButtonProps extends Programs {
  students: Students[];
  sections: Sections[];
}

const MoreButton = () => {
  const [data, setData] = useState<MoreButtonProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPrograms();
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

  const renderTableHTML = () => {
    return `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Name</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Code</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Students</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Sections</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Date Created</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.name
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.code
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.students.length
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                item.sections.length
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${format(
                item.createdAt,
                "MMMM dd, yyyy hh:mm a"
              )}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreButton;
