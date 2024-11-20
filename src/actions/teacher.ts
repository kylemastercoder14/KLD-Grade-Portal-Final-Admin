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
        employeeId: "asc",
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
    programId,
  } = validatedField.data;

  console.log("Inserting Teacher", values);

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
        programId,
      },
    });

    console.log("Teacher inserted:", teacher);
    return { success: "Teacher created successfully", teacher };
  } catch (error: any) {
    return {
      error: `Failed to create teacher. Please try again. ${
        error.message || ""
      }`,
    };
  }
};

const parseDateFromExcelNumber = (excelDate: number | string): string => {
  // Check if the input is already in valid date format (YYYY-MM-DD)
  if (typeof excelDate === "string" && !isNaN(Date.parse(excelDate))) {
    return new Date(excelDate).toISOString().split("T")[0];
  }

  // If the input is an Excel serial number, convert it to a date
  const excelNumber = Number(excelDate);
  if (isNaN(excelNumber) || excelNumber < 1) {
    throw new Error(`Invalid Excel date: ${excelDate}`);
  }

  const jsDate = new Date((excelNumber - 25569) * 86400 * 1000); // Convert Excel date to JS date
  return jsDate.toISOString().split("T")[0];
};

const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const createBulkTeachers = async (data: any[]) => {
  try {
    // Fetch the latest employee number from the database
    const latestTeacher = await db.teachers.findFirst({
      orderBy: { createdAt: "desc" },
      select: { employeeId: true },
    });

    const lastNumber = latestTeacher?.employeeId
      ? parseInt(latestTeacher.employeeId.split("-").pop() || "0", 10)
      : 0;

    const processedData = data.map((teacher, index) => {
      const birthDate = parseDateFromExcelNumber(teacher.birthDate);

      const age = birthDate
        ? calculateAge(new Date(birthDate)).toString()
        : "Unknown";
      const newNumber = (lastNumber + index + 1).toString().padStart(3, "0"); // Increment and format
      const employeeNumber = `KLD-EMP-${newNumber}`;

      return {
        employeeNumber,
        firstName: String(teacher.firstName),
        middleName: teacher.middleName ? String(teacher.middleName) : "",
        lastName: String(teacher.lastName),
        extensionName: teacher.extensionName
          ? String(teacher.extensionName)
          : "",
        birthDate: birthDate || "",
        age,
        gender: String(teacher.gender),
        maritalStatus: teacher.civilStatus
          ? String(teacher.civilStatus)
          : "", // Map to maritalStatus
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
        position: "Instructor",
        programId: teacher.programId ? String(teacher.programId) : "",
      };
    });

    console.log("Processed bulk data:", processedData);

    const results = await Promise.all(processedData.map((teacher) => createTeacher(teacher)));

    console.log("Bulk insert results:", results);
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
    programId,
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
        programId,
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
