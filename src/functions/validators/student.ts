import { z } from "zod";

export const StudentValidator = z.object({
  studentNumber: z.string().min(1, { message: "Student number is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  extensionName: z.string().optional(),
  birthDate: z.string().min(1, { message: "Birth date is required" }),
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  civilStatus: z.string().min(1, { message: "Civil status is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  municipality: z.string().min(1, { message: "Municipality is required" }),
  barangay: z.string().min(1, { message: "Barangay is required" }),
  houseNumber: z.string().min(1, { message: "House number is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[\w.-]+@kld\.edu\.ph$/, {
      message: "Email must be in the format: jdelacruz@kld.edu.ph",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  profileImage: z.string().optional(),

  // Education
  elementarySchool: z
    .string()
    .min(1, { message: "Elementary school is required" }),
  highSchool: z.string().min(1, { message: "High school is required" }),

  // Relationships
  yearLevelId: z.string().min(1, { message: "Year level is required" }),
  programId: z.string().min(1, { message: "Program is required" }),
  sectionId: z.string().min(1, { message: "Section is required" }),
});
