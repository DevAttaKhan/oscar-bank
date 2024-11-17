"use server";

import { CreateGroupSchema } from "@/lib/schema/groups.schema";

import { actionClient } from "./safe-action";
import { ApiError } from "next/dist/server/api-utils";
import { auth } from "@/auth";
import { GroupsService } from "@/services/groups.service";
import { IApiError } from "@/interfaces/types";

const session = await auth();
export const createGroupAction = actionClient
  .schema(CreateGroupSchema)
  .action(async ({ parsedInput }) => {
    const res = await GroupsService.createGroup(
      parsedInput,
      session?.user.token
    );

    if (!res.statusCode || res?.statusCode !== 201) {
      throw new Error((res as IApiError)?.errors?.join());
    }
    return res;
  });
export const updateGroupAction = actionClient
  .schema(CreateGroupSchema)
  .action(async ({ parsedInput }) => {
    const res = await GroupsService.update(parsedInput, session?.user.token);
    if (!res.statusCode || res?.statusCode !== 200) {
      throw new Error((res as ApiError).message);
    }
    return res;
  });
