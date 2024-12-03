/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RetrieveAction from "./retrieve-action";

export type TeacherColumn = {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  email: string;
  imageUrl: string;
  createdAt: string;
};

export type TeacherColumn1 = {
  id: string;
  name: string;
  employeeId: string;
  position: string;
  email: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<TeacherColumn>[] = [
  {
    accessorKey: "name",
    header: "Teacher",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="w-10 h-10 object-cover rounded-md">
          <AvatarImage src={row.original.imageUrl} alt={row.original.name} />
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
    accessorKey: "employeeId",
    header: "Employee No.",
  },
  {
    accessorKey: "position",
    header: "Position",
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

export const columns1: ColumnDef<TeacherColumn1>[] = [
  {
    accessorKey: "name",
    header: "Teacher",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Avatar className="w-10 h-10 object-cover rounded-md">
          <AvatarImage src={row.original.imageUrl} alt={row.original.name} />
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
    accessorKey: "employeeId",
    header: "Employee No.",
  },
  {
    accessorKey: "position",
    header: "Position",
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
