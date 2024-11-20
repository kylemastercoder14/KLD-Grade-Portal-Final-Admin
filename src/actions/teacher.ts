/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TeacherValidator } from "@/functions/validators/teacher";
import db from "@/lib/db";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const getAllTeachers = async () => {
  try {
    const data = await db.teachers.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!data) {
      return { error: "No teachers found." };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
};

export const createTeacher = async (
  values: z.infer<typeof TeacherValidator>
) => {
  const validatedField = TeacherValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    employeeNumber,
    firstName,
    middleName,
    lastName,
    extensionName,
    age,
    barangay,
    birthDate,
    maritalStatus,
    email,
    gender,
    houseNumber,
    municipality,
    password,
    phoneNumber,
    province,
    region,
    position,
    zipCode,
    profileImage,
    department,
  } = validatedField.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const teacher = await db.teachers.create({
      data: {
        employeeId: employeeNumber,
        firstName,
        middleName,
        lastName,
        extensionName,
        age,
        barangay,
        birthDate,
        civilStatus: maritalStatus,
        email,
        gender,
        houseNumber,
        city: municipality,
        password: hashedPassword,
        phoneNumber,
        province,
        region,
        zipCode,
        profileImage,
        position,
        programId: department,
      },
    });

    return { success: "Teacher created successfully", teacher };
  } catch (error: any) {
    return {
      error: `Failed to create teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

const parseDateFromExcelNumber = (excelDate: number): string => {
  const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // Convert Excel date to JS date
  return jsDate.toISOString().split("T")[0]; // Return in 'YYYY-MM-DD' format
};

export const createBulkTeachers = async (data: any[]) => {
  try {
    const processedData = data.map((teacher) => ({
      employeeNumber: String(teacher.employeeNumber),
      firstName: String(teacher.firstName),
      middleName: teacher.middleName ? String(teacher.middleName) : "",
      lastName: String(teacher.lastName),
      extensionName: teacher.extensionName
        ? String(teacher.extensionName)
        : "Unknown",
      birthDate: parseDateFromExcelNumber(teacher.birthDate),
      age: String(teacher.age),
      gender: String(teacher.gender),
      maritalStatus: teacher.civilStatus
        ? String(teacher.civilStatus)
        : "Unknown", // Map to maritalStatus
      phoneNumber: String(teacher.phoneNumber),
      region: String(teacher.region),
      province: String(teacher.province),
      municipality: teacher.city ? String(teacher.city) : "",
      barangay: String(teacher.barangay),
      houseNumber: String(teacher.houseNumber),
      zipCode: String(teacher.zipCode),
      email: String(teacher.email),
      password: String(teacher.password),
      profileImage: teacher.profileImage ? String(teacher.profileImage) : "",
      position: teacher.position ? String(teacher.position) : "",
      department: teacher.department ? String(teacher.department) : "",
    }));

    await Promise.all(processedData.map((teacher) => createTeacher(teacher)));

    return { success: "Teachers created successfully" };
  } catch (error) {
    console.error("Error creating teachers:", error);
    return { error: "Failed to create teachers. Please try again." };
  }
};

export const updateTeacher = async (
  values: z.infer<typeof TeacherValidator>,
  teacherId: string
) => {
  if (!teacherId) {
    return { error: "Teacher ID is required." };
  }

  const validatedField = TeacherValidator.safeParse(values);

  if (!validatedField.success) {
    const errors = validatedField.error.errors.map((err) => err.message);
    return { error: `Validation Error: ${errors.join(", ")}` };
  }

  const {
    employeeNumber,
    firstName,
    middleName,
    lastName,
    extensionName,
    age,
    barangay,
    birthDate,
    maritalStatus,
    email,
    gender,
    houseNumber,
    municipality,
    phoneNumber,
    province,
    region,
    position,
    zipCode,
    profileImage,
    department,
  } = validatedField.data;

  try {
    const teacher = await db.teachers.update({
      data: {
        employeeId: employeeNumber,
        firstName,
        middleName,
        lastName,
        extensionName,
        age,
        barangay,
        birthDate,
        civilStatus: maritalStatus,
        email,
        gender,
        houseNumber,
        city: municipality,
        phoneNumber,
        province,
        region,
        zipCode,
        profileImage,
        position,
        programId: department,
      },
      where: {
        id: teacherId,
      },
    });

    return { success: "Teacher updated successfully", teacher };
  } catch (error: any) {
    return {
      error: `Failed to update teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

export const archiveTeacher = async (teacherId: string) => {
  if (!teacherId) {
    return { error: "Teacher ID is required." };
  }

  try {
    const teacher = await db.teachers.update({
      data: {
        isArchive: true,
      },
      where: {
        id: teacherId,
      },
    });

    return { success: "Teacher archived successfully", teacher };
  } catch (error: any) {
    return {
      error: `Failed to archive teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};
