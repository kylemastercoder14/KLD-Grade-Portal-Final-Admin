/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

export type FeedbackColumn = {
  id: string;
  name: string;
  feedback: string;
  comment: string;
  createdAt: string;
};

export const columns: ColumnDef<FeedbackColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
