import { z } from "zod";

export const CreateDesignationSchma = z.object({
  title: z.string().min(5, "must have a title"),
  description: z.string().optional().or(z.literal("")),
  id: z.number().optional().or(z.null()),
});

export type DesignationInputType = z.infer<typeof CreateDesignationSchma>;
