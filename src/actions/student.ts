/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { StudentValidator } from "@/functions/validators";
import db from "@/lib/db";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const getAllStudents = async () => {
  try {
    const data = await db.students.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!data) {
      return { error: "No students found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createStudent = async (
  values: z.infer<typeof StudentValidator>
) => {
  const validatedField = StudentValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    studentNumber,
    firstName,
    middleName,
    lastName,
    extensionName,
    age,
    barangay,
    birthDate,
    maritalStatus,
    elementarySchool,
    email,
    gender,
    highSchool,
    houseNumber,
    municipality,
    password,
    phoneNumber,
    program,
    province,
    region,
    section,
    yearLevel,
    zipCode,
    profileImage,
  } = validatedField.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const student = await db.students.create({
      data: {
        studentNumber,
        firstName,
        middleName,
        lastName,
        extensionName,
        age,
        barangay,
        birthDate,
        civilStatus: maritalStatus,
        elementarySchool,
        email,
        gender,
        highSchool,
        houseNumber,
        city: municipality,
        password: hashedPassword,
        phoneNumber,
        programId: program,
        province,
        region,
        sectionId: section,
        yearLevelId: yearLevel,
        zipCode,
        profileImage,
      },
    });

    return { success: "Student created successfully", student };
  } catch (error: any) {
    return {
      error: `Failed to create student. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const updateStudent = async (
  values: z.infer<typeof StudentValidator>,
  studentId: string
) => {
  if (!studentId) {
    return { error: "Student ID is required." };
  }

  const validatedField = StudentValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    studentNumber,
    firstName,
    middleName,
    lastName,
    extensionName,
    age,
    barangay,
    birthDate,
    maritalStatus,
    elementarySchool,
    email,
    gender,
    highSchool,
    houseNumber,
    municipality,
    phoneNumber,
    program,
    province,
    region,
    section,
    yearLevel,
    zipCode,
    profileImage,
  } = validatedField.data;

  try {
    const student = await db.students.update({
      data: {
        studentNumber,
        firstName,
        middleName,
        lastName,
        extensionName,
        age,
        barangay,
        birthDate,
        civilStatus: maritalStatus,
        elementarySchool,
        email,
        gender,
        highSchool,
        houseNumber,
        city: municipality,
        phoneNumber,
        programId: program,
        province,
        region,
        sectionId: section,
        yearLevelId: yearLevel,
        zipCode,
        profileImage,
      },
      where: {
        id: studentId,
      }
    });

    return { success: "Student updated successfully", student };
  } catch (error: any) {
    return {
      error: `Failed to update student. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const archiveStudent = async (studentId: string) => {
  if (!studentId) {
    return { error: "Student ID is required." };
  }

  try {
    const student = await db.students.update({
      data: {
        isArchive: true,
      },
      where: {
        id: studentId,
      },
    });

    return { success: "Student archived successfully", student };
  } catch (error: any) {
    return {
      error: `Failed to archive student. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
