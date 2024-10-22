/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type LogColumn = {
  id: string;
  action: string;
  createdAt: string;
};

export const columns: ColumnDef<LogColumn>[] = [
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
