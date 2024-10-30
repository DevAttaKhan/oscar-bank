import * as z from "zod";

export const CreateBranchSchema = z.object({
  name: z.string().min(1, "Branch name is required").max(255),
  code: z.number().int("Branch code must be an integer"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.number().int("Postal code must be an integer"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number should be between 10 to 15 digits"),
  email: z.string().email("Invalid email address"),
  managerId: z.number().int().optional(), // Assuming managerId is optional
  status: z.enum(["Active", "Inactive", "Closed"]).default("Active"),
});

export type CreateBranchInputType = z.infer<typeof CreateBranchSchema>;
