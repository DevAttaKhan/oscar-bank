import { BranchService } from "@/services/branch.service";
import { BranchListingTable } from "@/features/branches";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { IBranch } from "@/interfaces/branch.interface";
import { auth } from "@/auth";

const BranchesPage = async ({ searchParams }) => {
  const session = await auth();

  const res = await BranchService.list({
    params: await searchParams,
    token: session?.user.token,
  });

  if (res.statusCode !== 200) {
    return <h1> {(res as IApiError).message} </h1>;
  }

  return (
    <BranchListingTable
      data={(res as IApiResponse<IBranch>).result.data}
      meta={(res as IApiResponse<IBranch>).result.meta}
    />
  );
};

export default BranchesPage;
