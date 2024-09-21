import { z } from "zod";

export const CourseValidators = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  unit: z.coerce.number().min(1, { message: "Unit is required" }),
  preRequisite: z.string().optional(),
});
