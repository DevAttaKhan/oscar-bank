"use client";
import { DataTable } from "@/components/common/data-table";
import { useMemo } from "react";
import { createBranchListColumns } from "./table-columns";
import { IBranch } from "@/interfaces/branch.interface";
import { ResponseMeta } from "@/interfaces/types";
import { Lucide, PaginationControl } from "@/components/common";
import { useParamsNavigation } from "@/hooks";
import { Input, SelectDropdown } from "@/components/ui";
import { BRANCH_STATUS_OPTIONS } from "@/lib/constants/branch.constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "lucide-react";
import Link from "next/link";
import { Can } from "@/providers/ability.provider";

type Props = {
  data: IBranch[];
  meta: ResponseMeta;
};
export const BranchListingTable: React.FC<Props> = ({ data, meta }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { navigateWithQueryParams, getParams } = useParamsNavigation();
  const handlePageChange = (page) => {
    const params = getParams();
    params.set("page", page);
    navigateWithQueryParams(params);
  };

  const handleStatusChange = async ({ value }) => {
    const params = getParams();
    params.delete("page");
    params.set("status", value);
    navigateWithQueryParams(params);
  };

  const branchListColumns = useMemo(() => createBranchListColumns({}), []);
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 ">Branches</h2>
      <div className=" bg-white rounded-lg mb-2 border flex items-center justify-between py-2 px-4">
        <Input placeholder="Search" />

        <div className="flex items-center gap-2 flex-1">
          <SelectDropdown
            value={BRANCH_STATUS_OPTIONS.find(
              (el) => el.value === searchParams.get("status")
            )}
            onChange={handleStatusChange}
            placeholder="Status"
            options={BRANCH_STATUS_OPTIONS}
            className="w-full max-w-24 ml-auto"
          />
          <Can I="list" a="branch">
            <Link
              href={`/admin/branches/create`}
              className="p-2 border rounded hover:bg-slate-100"
            >
              <Lucide name="Plus" size={16} />
            </Link>
          </Can>
        </div>
      </div>
      <DataTable columns={branchListColumns} data={data} />
      <PaginationControl meta={meta} gotoPage={handlePageChange} />
    </div>
  );
};
