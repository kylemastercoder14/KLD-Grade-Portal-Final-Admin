/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RetrieveAction from "./retrieve-action";

export type StudentColumn = {
  id: string;
  name: string;
  studentId: string;
  programId: string;
  yearLevelId: string;
  sectionId: string;
  email: string;
  imageUrl: string;
  createdAt: string;
};

export type StudentColumn1 = {
  id: string;
  name: string;
  studentId: string;
  programId: string;
  yearLevelId: string;
  sectionId: string;
  email: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<StudentColumn>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="w-10 h-10 object-cover rounded-md">
          <AvatarImage src={row.original.imageUrl} alt="Avatar" />
          <AvatarFallback className="rounded-md">
            {row.original.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "studentId",
    header: "Student No.",
  },
  {
    accessorKey: "programId",
    header: "Program",
  },
  {
    accessorKey: "yearLevelId",
    header: "Year Level",
  },
  {
    accessorKey: "sectionId",
    header: "Section",
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

export const columns1: ColumnDef<StudentColumn1>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="w-10 h-10 object-cover rounded-md">
          <AvatarImage src={row.original.imageUrl} alt="Avatar" />
          <AvatarFallback className="rounded-md">
            {row.original.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "studentId",
    header: "Student No.",
  },
  {
    accessorKey: "programId",
    header: "Program",
  },
  {
    accessorKey: "yearLevelId",
    header: "Year Level",
  },
  {
    accessorKey: "sectionId",
    header: "Section",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RetrieveAction data={row.original} />,
  },
];
