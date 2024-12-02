/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
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
  IconPrinter,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AssignTeacher, Sections, Teachers } from "@prisma/client";
import { getAllAssignAdviser } from "@/actions/assign-teacher";
import { format } from "date-fns";

interface MoreButtonProps extends AssignTeacher {
  teachers: Teachers[];
  sections: Sections[];
}

const MoreButton = () => {
  const [data, setData] = useState<MoreButtonProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAssignAdviser();
      if (response.data) {
        console.log("Fetched Data: ", response.data); // Debugging log
        setData(
          response.data.map((item: any) => ({
            ...item,
            teachers: [item.teacher],
            sections: [item.section],
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
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Section</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Date Created</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map((item) => {
              // Ensure teachers and sections are not empty or undefined
              const teacherName =
                item.teachers && item.teachers.length > 0
                  ? `${item.teachers[0].firstName} ${item.teachers[0].lastName}`
                  : "No Teacher Assigned";
              const sectionName =
                item.sections && item.sections.length > 0
                  ? item.sections[0].name
                  : "No Section Assigned";
              const createdAt = format(item.createdAt, "MMMM dd, yyyy hh:mm a") || "N/A";
              return `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${teacherName}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${sectionName}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${createdAt}</td>
                </tr>
              `;
            })
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
            body { font-family: Arial, sans-serif; margin: 20px; color: black; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; border: 1px solid #ddd; }
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
