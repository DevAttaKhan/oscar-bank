import { z } from "zod";

export const LoginFromSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "email field is a required field" })
    .email(),
  password: z
    .string()
    .min(4, { message: "at least 4 character are required " }),
});

export type LoginFromSchemaType = z.infer<typeof LoginFromSchema>;
