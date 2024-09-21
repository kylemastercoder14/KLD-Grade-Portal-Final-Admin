/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type SectionColumn = {
  id: string;
  name: string;
  yearLevel: string;
  yearLevelId: string;
  programId: string;
  programs: string;
  students: string;
  createdAt: string;
};

export const columns: ColumnDef<SectionColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "yearLevel",
    header: "Year Level",
  },
  {
    accessorKey: "programs",
    header: "Program",
  },
  {
    accessorKey: "students",
    header: "Students",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
