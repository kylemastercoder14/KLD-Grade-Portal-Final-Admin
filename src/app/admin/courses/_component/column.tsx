/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export type CourseColumn = {
  id: string;
  name: string;
  code: string;
  unit: number;
  preRequisite: string;
  preRequisiteId: string;
  createdAt: string;
};

export const columns: ColumnDef<CourseColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          <p>Name</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    cell: ({row}) => (
      <span>{row.original.name}</span>
    )
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          <p>Code</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "unit",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          <p>Unit</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    accessorKey: "preRequisite",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          <p>Pre-requisite</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
    
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <span
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer"
        >
          <p>Date Created</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
