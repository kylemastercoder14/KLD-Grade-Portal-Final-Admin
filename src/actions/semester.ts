/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { SemesterValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

export const getAllSemesters = async () => {
  try {
    const data = await db.semester.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!data) {
      return { error: "No semester found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createSemester = async (
  values: z.infer<typeof SemesterValidator>
) => {
  const validatedField = SemesterValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, year } = validatedField.data;

  try {
    const semester = await db.semester.create({
      data: {
        name,
        year
      },
    });

    return { success: "Semester created successfully", semester };
  } catch (error: any) {
    return {
      error: `Failed to create semester. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateSemester = async (
  values: z.infer<typeof SemesterValidator>,
  semesterId: string
) => {
  if (!semesterId) {
    return { error: "Semester ID is required." };
  }

  const validatedField = SemesterValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, year } = validatedField.data;

  try {
    const yearLevel = await db.semester.update({
      where: {
        id: semesterId,
      },
      data: {
        name,
        year
      },
    });

    return { success: "Semester updated successfully", yearLevel };
  } catch (error: any) {
    return {
      error: `Failed to update semester. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteSemester = async (semesterId: string) => {
  if (!semesterId) {
    return { error: "Semester ID is required." };
  }

  try {
    const semester = await db.semester.delete({
      where: {
        id: semesterId,
      },
    });

    return { success: "Semester deleted successfully", semester };
  } catch (error: any) {
    return {
      error: `Failed to delete semester. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
