import { DataTable } from "@/components/common/data-table";
import { createBranchListColumns } from "@/features/branches/table-columns";
import { BranchService } from "@/services/branch.service";
import { BranchListingTable } from "@/features/branches";
import { IApiError, IApiResponse } from "@/interfaces/types";
import { IBranch } from "@/interfaces/branch.interface";
import { auth } from "@/auth";

const BranchesPage = async ({ params, searchParams }) => {
  const session = await auth();
  const res = await BranchService.getAll(await searchParams, session?.user, [
    "branches",
  ]);

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
