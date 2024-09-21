import { z } from "zod";

export const SectionValidators = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  yearLevel: z.string().min(1, { message: "Year level is required" }),
  program: z.string().min(1, { message: "Program is required" }),
});
