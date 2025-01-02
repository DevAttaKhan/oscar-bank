import {
  EmploymentStatus,
  EmploymentType,
} from "@/interfaces/employee.interface";
import { UserStatus } from "@/interfaces/user.interface";
import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  username: z.string().min(1, "username is required").max(255),
  email: z.string().email("a valid email is required"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(10, "Phone number must have at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  firstName: z.string().min(1, "firstName is required").max(255),
  lastName: z.string().min(1, "lastName is required").max(255),
  cnic: z
    .string()
    .regex(/^\d+$/, "Cnic number must contain only digits")
    .min(10, "Cnic number must have at least 10 digits")
    .max(15, "Cnic number must not exceed 15 digits"),
  dateOfBirth: z.date({ message: "Date of Birth is Required" }),
  address: z.string().min(1, "address is required").max(255),
  profileImageUrl: z.string().optional(),
  status: z.enum(Object.values(UserStatus) as [string, ...string[]]),
  employmentStatus: z.enum(
    Object.values(EmploymentStatus) as [string, ...string[]]
  ),
  employmentType: z.enum(
    Object.values(EmploymentType) as [string, ...string[]]
  ),
  dateOfJoining: z.date({ message: "Date of Joining is Required" }),
  salary: z
    .string()
    .regex(/^\d+$/, "Salary number must contain only digits")
    .min(1, "Salary number must have at least 1 digits")
    .max(15, "Salary number must not exceed 15 digits"),
  bonus: z
    .string()
    .regex(/^\d+$/, "Bonus number must contain only digits")
    .min(1, "Bonus number must have at least 1 digits")
    .max(15, "Bonus number must not exceed 15 digits"),
  designationId: z.number().optional(),
  assignedBranchId: z.number().optional(),
  supervisorId: z.number().optional(),
});

export type CreateEmployeeSchemaInput = z.infer<typeof CreateEmployeeSchema>;
