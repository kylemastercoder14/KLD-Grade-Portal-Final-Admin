/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type AssignCourseTeacherColumn = {
  id: string;
  name: string;
  section: string;
  teacherId: string;
  sectionId: string;
  courseId: string;
  course: string;
  createdAt: string;
};

export const columns: ColumnDef<AssignCourseTeacherColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "course",
    header: "Course",
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
