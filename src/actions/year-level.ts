/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { YearLevelValidators } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

// GET ALL YEAR LEVELS IN THE DATABASE
export const getAllYearLevel = async () => {
  try {
    const data = await db.yearLevels.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        student: true,
        section: true,
      },
    });

    if (!data) {
      return { error: "No year levels found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

// INSER YEAR LEVEL IN THE DATABASE
export const createYearLevel = async (
  values: z.infer<typeof YearLevelValidators>
) => {
  const validatedField = YearLevelValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name } = validatedField.data;

  try {
    const yearLevel = await db.yearLevels.create({
      data: {
        name,
      },
    });

    await db.logs.create({
      data: {
        action: "You added a new year level"
      }
    })

    return { success: "Year Level created successfully", yearLevel };
  } catch (error: any) {
    return {
      error: `Failed to create year level. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createBulkYearLevel = async (data: any[]) => {
  try {
    for (const yearLevel of data) {
      await createYearLevel(yearLevel);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// UPDATE YEAR LEVEL IN THE DATABASE
export const updateYearLevel = async (
  values: z.infer<typeof YearLevelValidators>,
  yearLevelId: string
) => {
  if (!yearLevelId) {
    return { error: "Year level ID is required." };
  }

  const validatedField = YearLevelValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name } = validatedField.data;

  try {
    const yearLevel = await db.yearLevels.update({
      where: {
        id: yearLevelId,
      },
      data: {
        name,
      },
    });

    await db.logs.create({
      data: {
        action: `You updated a year level ${yearLevel.id}`
      }
    })

    return { success: "Year Level updated successfully", yearLevel };
  } catch (error: any) {
    return {
      error: `Failed to update year level. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

// DELETE YEAR LEVEL IN THE DATABASE
export const deleteYearLevel = async (yearLevelId: string) => {
  if (!yearLevelId) {
    return { error: "Year level ID is required." };
  }

  try {
    const yearLevel = await db.yearLevels.delete({
      where: {
        id: yearLevelId,
      },
    });

    await db.logs.create({
      data: {
        action: `You deleted a year level ${yearLevel.id}`
      }
    })

    return { success: "Year Level deleted successfully", yearLevel };
  } catch (error: any) {
    return {
      error: `Failed to delete year level. Please try again. ${error.message || ""}`,
    };
  }
};

