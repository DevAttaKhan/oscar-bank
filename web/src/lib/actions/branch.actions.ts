"use server";

import { BranchService } from "@/services/branch.service";
import { CreateBranchSchema } from "../schema/branches.schema";
import { actionClient } from "./safe-action";
import { ApiError } from "next/dist/server/api-utils";
import { auth, signOut } from "@/auth";

const session = await auth();
export const createBranchAction = actionClient
  .schema(CreateBranchSchema)
  .action(async ({ parsedInput }) => {
    const res = await BranchService.createBranch(
      parsedInput,
      session?.user.token
    );
    if (res.statusCode === 401) {
      throw new Error((res as ApiError).message);
    }
    return res;
  });
