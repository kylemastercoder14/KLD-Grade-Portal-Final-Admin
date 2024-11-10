/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { AssignAdviserValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

export const getAllAssignAdviser = async () => {
  try {
    const data = await db.assignTeacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        section: true,
        teacher: true,
      },
    });

    if (!data) {
      return { error: "No assign adviser found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createAssignAdviser = async (
  values: z.infer<typeof AssignAdviserValidator>
) => {
  const validatedField = AssignAdviserValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { teacher, section } = validatedField.data;

  try {
    const sectionsArray = Array.isArray(section) ? section : [section];

    // Map through each section ID and create a record for each in the AssignTeacher table
    const assignAdviserPromises = sectionsArray.map((sectionId: string) => {
      return db.assignTeacher.create({
        data: {
          teacherId: teacher,
          sectionId: sectionId,
        },
      });
    });

    // Execute all create operations
    const assignAdviserResults = await Promise.all(assignAdviserPromises);

    return { success: "Adviser assigned successfully", assignAdviserResults };
  } catch (error: any) {
    return {
      error: `Failed to assign adviser. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateAssignAdviser = async (
  values: z.infer<typeof AssignAdviserValidator>,
  assignAdvisorId: string
) => {
  if (!assignAdvisorId) {
    return { error: "Assign advisor ID is required." };
  }

  const validatedField = AssignAdviserValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { teacher, section } = validatedField.data;

  try {
    const sectionId = Array.isArray(section) ? section[0] : section;
    const assignAdviser = await db.assignTeacher.update({
      where: {
        id: assignAdvisorId,
      },
      data: {
        teacherId: teacher,
        sectionId: sectionId,
      },
    });

    return { success: "Adviser assigned successfully", assignAdviser };
  } catch (error: any) {
    return {
      error: `Failed to assign adviser. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteAssignAdviser = async (assignAdvisorId: string) => {
  if (!assignAdvisorId) {
    return { error: "Assign adviser ID is required." };
  }

  try {
    const assignAdviser = await db.assignTeacher.delete({
      where: {
        id: assignAdvisorId,
      },
    });

    return { success: "Assigned adviser deleted successfully", assignAdviser };
  } catch (error: any) {
    return {
      error: `Failed to delete assigned adviser. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
