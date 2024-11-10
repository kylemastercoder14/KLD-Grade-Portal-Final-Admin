/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { AssignCourseTeacherValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";

export const getAllAssignCoursTeacher = async () => {
  try {
    const data = await db.assignCourseTeacher.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        section: true,
        teacher: true,
        course: true,
      },
    });

    if (!data) {
      return { error: "No course teacher found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createAssignCourseTeacher = async (
  values: z.infer<typeof AssignCourseTeacherValidator>
) => {
  const validatedField = AssignCourseTeacherValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { teacher, section, course } = validatedField.data;

  try {
    const sectionsArray = Array.isArray(section) ? section : [section];
    const coursesArray = Array.isArray(course) ? course : [course];

    // Create a record for each combination of section and course
    const assignCourseTeacherPromises = sectionsArray.flatMap(
      (sectionId: string) =>
        coursesArray.map((courseId: string) =>
          db.assignCourseTeacher.create({
            data: {
              teacherId: teacher,
              sectionId: sectionId,
              courseId: courseId,
            },
          })
        )
    );

    // Execute all create operations
    const assignCourseTeacherResults = await Promise.all(
      assignCourseTeacherPromises
    );

    return {
      success: "Course teacher assigned successfully",
      assignCourseTeacherResults,
    };
  } catch (error: any) {
    return {
      error: `Failed to assign adviser. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateAssignCourseTeacher = async (
  values: z.infer<typeof AssignCourseTeacherValidator>,
  assignCourseTeacherId: string
) => {
  if (!assignCourseTeacherId) {
    return { error: "Course teacher ID is required." };
  }

  const validatedField = AssignCourseTeacherValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const { teacher, section, course } = validatedField.data;

  try {
    const sectionId = Array.isArray(section) ? section[0] : section;
    const courseId = Array.isArray(course) ? course[0] : course;
    const assignCourseTeacher = await db.assignCourseTeacher.update({
      where: {
        id: assignCourseTeacherId,
      },
      data: {
        teacherId: teacher,
        sectionId: sectionId,
        courseId: courseId,
      },
    });

    return { success: "Course teacher assigned successfully", assignCourseTeacher };
  } catch (error: any) {
    return {
      error: `Failed to assign course teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const deleteAssignCourseTeacher = async (assignCourseTeacherId: string) => {
  if (!assignCourseTeacherId) {
    return { error: "Course teacher ID is required." };
  }

  try {
    const assignCourseTeacher = await db.assignCourseTeacher.delete({
      where: {
        id: assignCourseTeacherId,
      },
    });

    return { success: "Course teacher deleted successfully", assignCourseTeacher };
  } catch (error: any) {
    return {
      error: `Failed to delete course teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
