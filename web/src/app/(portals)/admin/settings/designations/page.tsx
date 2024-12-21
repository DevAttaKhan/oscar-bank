import { auth } from "@/auth";
import { DesignationListingTable } from "@/features/settings/designation";
import { IDesignation } from "@/interfaces/designation.interface";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { DesignationService } from "@/services/designation.service";
import React from "react";

const DesignationsPage = async ({ searchParams }) => {
  const session = await auth();
  const res = await DesignationService.list({
    params: await searchParams,
    token: session?.user.token,
  });

  console.log((res as IApiResponse<IDesignation>).result.data.length);

  if ((res as IApiError).statusCode !== 200) {
    throw new Error("Oops Bang");
  }

  return (
    <DesignationListingTable
      data={(res as IApiResponse<IDesignation>).result.data}
      meta={(res as IApiResponse<IDesignation>).result.meta}
    />
  );
};

export default DesignationsPage;
