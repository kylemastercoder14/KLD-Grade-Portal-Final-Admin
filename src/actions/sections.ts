/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { SectionValidators } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

// GET ALL SECTIONS IN THE DATABASE
export const getAllSections = async () => {
  try {
    const data = await db.sections.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        student: true,
        programs: true,
        yearLevels: true,
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

// INSER SECTION IN THE DATABASE
export const createSection = async (
  values: z.infer<typeof SectionValidators>
) => {
  const validatedField = SectionValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, yearLevel, program } = validatedField.data;

  try {
    const section = await db.sections.create({
      data: {
        name,
        yearLevelId: yearLevel,
        programId: program,
      },
    });

    return { success: "Section created successfully", section };
  } catch (error: any) {
    return {
      error: `Failed to create section. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createBulkSections = async (data: any[]) => {
  try {
    for (const section of data) {
      await createSection(section);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// UPDATE SECTION IN THE DATABASE
export const updateSection = async (
  values: z.infer<typeof SectionValidators>,
  sectionId: string
) => {
  if (!sectionId) {
    return { error: "Section ID is required." };
  }

  const validatedField = SectionValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, yearLevel, program } = validatedField.data;

  try {
    const section = await db.sections.update({
      where: {
        id: sectionId,
      },
      data: {
        name,
        programId: program,
        yearLevelId: yearLevel,
      },
    });

    return { success: "Section updated successfully", section };
  } catch (error: any) {
    return {
      error: `Failed to update section. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

// DELETE SECTION IN THE DATABASE
export const deleteSection = async (sectionId: string) => {
  if (!sectionId) {
    return { error: "Section ID is required." };
  }

  try {
    const section = await db.sections.delete({
      where: {
        id: sectionId,
      },
    });

    return { success: "Section deleted successfully", section };
  } catch (error: any) {
    return {
      error: `Failed to delete section. Please try again. ${error.message || ""}`,
    };
  }
};

