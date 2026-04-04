import { z } from "zod";

export const recordSchema = z.object({
  title: z.string().min(1, "Title is required"),

  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be a positive number"),

  type: z.enum(["income", "expense"]),

  category: z.enum([
    "salary",
    "investment",
    "food",
    "rent",
    "travel",
    "utilities",
    "entertainment",
    "other",
  ]),

  date: z.coerce.date(),

  notes: z.string().optional(),
});
export const updateRecordSchema = recordSchema.partial();