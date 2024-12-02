/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ProgramValidators } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

// GET ALL PROGRAMS IN THE DATABASE
export const getAllPrograms = async () => {
  try {
    const data = await db.programs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: true,
        section: true,
      },
    });

    if (!data) {
      return { error: "No programs found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

// INSER PROGRAM IN THE DATABASE
export const createProgram = async (
  values: z.infer<typeof ProgramValidators>
) => {
  const validatedField = ProgramValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, code } = validatedField.data;

  try {
    const program = await db.programs.create({
      data: {
        name,
        code,
      },
    });

    return { success: "Program created successfully", program };
  } catch (error: any) {
    return {
      error: `Failed to create program. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createBulkPrograms = async (data: any[]) => {
  try {
    for (const program of data) {
      await createProgram(program);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// UPDATE PROGRAM IN THE DATABASE
export const updateProgram = async (
  values: z.infer<typeof ProgramValidators>,
  programId: string
) => {
  if (!programId) {
    return { error: "Program ID is required." };
  }

  const validatedField = ProgramValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, code } = validatedField.data;

  try {
    const program = await db.programs.update({
      where: {
        id: programId,
      },
      data: {
        name,
        code,
      },
    });

    return { success: "Program updated successfully", program };
  } catch (error: any) {
    return {
      error: `Failed to update program. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

// DELETE PROGRAM IN THE DATABASE
export const deleteProgram = async (programId: string) => {
  if (!programId) {
    return { error: "Program level ID is required." };
  }

  try {
    const program = await db.programs.delete({
      where: {
        id: programId,
      },
    });

    return { success: "Program deleted successfully", program };
  } catch (error: any) {
    return {
      error: `Failed to delete program. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
