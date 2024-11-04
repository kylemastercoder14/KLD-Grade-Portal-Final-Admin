/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { CourseValidators } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

// GET ALL COURSES IN THE DATABASE
export const getAllCourses = async () => {
  try {
    const data = await db.courses.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      return { error: "No courses found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

// INSER COURSE IN THE DATABASE
export const createCourse = async (
  values: z.infer<typeof CourseValidators>
) => {
  const validatedField = CourseValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, code, unit, preRequisite } = validatedField.data;

  try {
    const course = await db.courses.create({
      data: {
        name,
        code,
        unit,
        prerequisite: preRequisite,
      },
    });

    return { success: "Course created successfully", course };
  } catch (error: any) {
    return {
      error: `Failed to create course. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const createBulkCourses = async (data: any[]) => {
  try {
    for (const course of data) {
      await createCourse(course);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// UPDATE COURSE IN THE DATABASE
export const updateCourse = async (
  values: z.infer<typeof CourseValidators>,
  courseId: string
) => {
  if (!courseId) {
    return { error: "Course ID is required." };
  }

  const validatedField = CourseValidators.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { name, code, unit, preRequisite } = validatedField.data;

  try {
    const course = await db.courses.update({
      where: {
        id: courseId,
      },
      data: {
        name,
        code,
        unit,
        prerequisite: preRequisite,
      },
    });

    return { success: "Course updated successfully", course };
  } catch (error: any) {
    return {
      error: `Failed to update course. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

// DELETE COURSE IN THE DATABASE
export const deleteCourse = async (courseId: string) => {
  if (!courseId) {
    return { error: "Course ID is required." };
  }

  try {
    const course = await db.courses.delete({
      where: {
        id: courseId,
      },
    });

    return { success: "Course deleted successfully", course };
  } catch (error: any) {
    return {
      error: `Failed to delete course. Please try again. ${error.message || ""}`,
    };
  }
};

