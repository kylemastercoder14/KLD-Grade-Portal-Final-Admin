import { z } from "zod";

export const AssignAdviserValidator = z.object({
  teacher: z.string().min(1, { message: "Teacher is required" }),
  section: z.union([
    z.string().min(1, { message: "Section is required" }),
    z
      .array(z.string())
      .nonempty({ message: "At least one section is required" }),
  ]),
});
