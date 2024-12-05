import { z } from "zod";

export const CreateDesignationSchma = z.object({
  title: z.string(),
  description: z.string(),
  id: z.number().optional().or(z.null()),
});

export type DesignationInputType = z.infer<typeof CreateDesignationSchma>;
