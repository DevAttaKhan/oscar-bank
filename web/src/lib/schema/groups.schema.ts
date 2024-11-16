import { z } from "zod";

export const CreateGroupSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(4, { message: "Group must have a name" }),
  description: z.string().optional().or(z.literal("")),
  permissions: z.array(z.number()),
});

export type CreateGroupSchemaInputType = z.infer<typeof CreateGroupSchema>;
