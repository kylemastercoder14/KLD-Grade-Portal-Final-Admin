/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
    accessorKey: "attachment",
    header: "Attachment",
    cell: ({ row }) => (
      <Image
        alt="Attachment"
        className="rounded-sm"
        width={60}
        height={60}
        src={row.original.attachment}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "concerns",
    header: "Concern",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <Badge variant={row.original.status === "Pending" ? "destructive" : "default"}>{row.original.status}</Badge>
    )
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
