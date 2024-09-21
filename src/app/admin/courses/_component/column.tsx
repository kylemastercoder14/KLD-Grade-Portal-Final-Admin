/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CourseColumn = {
  id: string;
  name: string;
  code: string;
  unit: number;
  preRequisite: string;
  createdAt: string;
};

export const columns: ColumnDef<CourseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "preRequisite",
    header: "Pre-requisite",
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
