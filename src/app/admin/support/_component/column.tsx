/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export type SupportColumn = {
  id: string;
  name: string;
  email: string;
  concerns: string;
  attachment: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<SupportColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "concerns",
    header: "Concern",
  },
  {
    accessorKey: "attachment",
    header: "Attachment",
    cell: ({ row }) => (
      <Link className="hover:underline text-primary" href={row.original.attachment} target="_blank">
        {row.original.attachment}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Pending" ? "destructive" : "default"}
      >
        {row.original.status}
      </Badge>
    ),
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
