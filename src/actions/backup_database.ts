"use server";

import db from "@/lib/db";

export const getAllDataFromDatabase = async () => {
  try {
    const announcement = await db.announcement.findMany();
    const assignCourseTeacher = await db.assignCourseTeacher.findMany();
    const assignTeacher = await db.assignTeacher.findMany();
    const consultation = await db.consultation.findMany();
    const courses = await db.courses.findMany();
    const documentRequest = await db.documentRequest.findMany();
    const feedback = await db.feedback.findMany();
    const grade = await db.grades.findMany();
    const logs = await db.logs.findMany();
    const programs = await db.programs.findMany();
    const sections = await db.sections.findMany();
    const students = await db.students.findMany();
    const teachers = await db.teachers.findMany();
    const support = await db.support.findMany();
    const uploadedEcr = await db.uploadedEcr.findMany();
    const yearLevels = await db.yearLevels.findMany();

    return {
      announcement,
      assignCourseTeacher,
      assignTeacher,
      consultation,
      courses,
      documentRequest,
      feedback,
      grade,
      logs,
      programs,
      sections,
      teachers,
      students,
      support,
      uploadedEcr,
      yearLevels,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { error: error.message };
    } else {
      console.error("Unknown error", error);
      return { error: "Unknown error" };
    }
  }
};

export const insertBackupDatabase = async (fileName: string) => {
  try {
    await db.database.create({
      data: {
        name: fileName,
      },
    });

    await db.logs.create({
      data: {
        action: `Admin created a backup database with the filename: ${fileName} at ${new Date().toISOString()}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { error: error.message };
    } else {
      console.error("Unknown error", error);
      return { error: "Unknown error" };
    }
  }
};

export const getAllBackupDatabase = async () => {
  try {
    const database = await db.database.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: database };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return { error: error.message };
    } else {
      console.error("Unknown error", error);
      return { error: "Unknown error" };
    }
  }
};
