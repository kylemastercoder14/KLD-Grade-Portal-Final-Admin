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
      include: {
        programs: true,
        yearLevels: true,
        sections: true,
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

const parseDateFromExcelNumber = (excelDate: number): string => {
  const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // Convert Excel date to JS date
  return jsDate.toISOString().split("T")[0]; // Return in 'YYYY-MM-DD' format
};

export const createBulkStudents = async (data: any[]) => {
  try {
    const processedData = data.map((student) => ({
      studentNumber: String(student.studentNumber),
      firstName: String(student.firstName),
      middleName: student.middleName ? String(student.middleName) : "",
      lastName: String(student.lastName),
      extensionName: student.extensionName
        ? String(student.extensionName)
        : "Unknown",
      birthDate: parseDateFromExcelNumber(student.birthDate),
      age: String(student.age),
      gender: String(student.gender),
      maritalStatus: student.civilStatus
        ? String(student.civilStatus)
        : "Unknown", // Map to maritalStatus
      phoneNumber: String(student.phoneNumber),
      region: String(student.region),
      province: String(student.province),
      municipality: student.city ? String(student.city) : "",
      barangay: String(student.barangay),
      houseNumber: String(student.houseNumber),
      zipCode: String(student.zipCode),
      email: String(student.email),
      password: String(student.password),
      elementarySchool: String(student.elementarySchool),
      highSchool: String(student.highSchool),
      yearLevel: student.yearLevelId
        ? String(student.yearLevelId)
        : "defaultYearLevel", // Map to yearLevel
      program: student.programId ? String(student.programId) : "",
      section: student.sectionId ? String(student.sectionId) : "",
      profileImage: student.profileImage ? String(student.profileImage) : "",
    }));

    await Promise.all(
      processedData.map((student) => createStudent(student))
    );

    return { success: "Students created successfully" };
  } catch (error) {
    console.error("Error creating students:", error);
    return { error: "Failed to create students. Please try again." };
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
      },
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
