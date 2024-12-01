/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { IconFileExcel } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type BackupDatabaseColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<BackupDatabaseColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        className="flex items-center gap-1 text-green-700 dark:text-green-500 underline"
        href={row.original.name}
      >
        <IconFileExcel className="w-4 h-4" />
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
