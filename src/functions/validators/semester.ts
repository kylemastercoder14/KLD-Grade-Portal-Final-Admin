import { z } from "zod";

export const SemesterValidator = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    year: z.string().min(1, {message: "Year is required"}),
})