"use client";
import { DataTable } from "@/components/common/data-table";
import { useCallback, useMemo } from "react";

import { IBranch } from "@/interfaces/branch.interface";
import { ResponseMeta } from "@/interfaces/types";
import { Lucide, PaginationControl, SearchInput } from "@/components/common";
import { useParamsNavigation } from "@/hooks";
import { SelectDropdown } from "@/components/ui";
import { BRANCH_STATUS_OPTIONS } from "@/lib/constants/branch.constants";
import { useSearchParams } from "next/navigation";
import { Can } from "@/providers/ability.provider";
import { debounce } from "lodash";
import Link from "next/link";
import { IEmployee } from "@/interfaces/employee.interface";
import { createEmployeeListColumns } from "./table-columns";

type Props = {
  data: IEmployee[];
  meta: ResponseMeta;
};
export const EmployeeListingTable: React.FC<Props> = ({ data, meta }) => {
  const searchParams = useSearchParams();

  const { navigateWithQueryParams, getParams, getParamKeys } =
    useParamsNavigation();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = getParams();
      params.set("page", "1");
      params.set("fields", "user.firstName,employeeCode");
      params.set("search", value);
      navigateWithQueryParams(params);
    }, 500),
    [getParams, navigateWithQueryParams]
  );

  const onClearFilters = () => {
    const params = getParams();
    getParamKeys().forEach((el) => {
      params.delete(el);
    });
    navigateWithQueryParams(params);
  };

  const handleClearSearch = () => {
    const params = getParams();
    params.delete("search");
    params.delete("fields");
    navigateWithQueryParams(params);
  };

  const handleSort = useCallback(
    (orderBy: string, order: string) => {
      const params = getParams();

      if (!order) {
        params.set("orderBy", orderBy);
        params.set("order", "asc");
      }
      if (order === "asc") {
        params.set("orderBy", orderBy);
        params.set("order", "desc");
      }

      if (order === "desc") {
        params.delete("order");
        params.delete("orderBy");
      }

      navigateWithQueryParams(params);
    },
    [getParams, navigateWithQueryParams]
  );

  const branchListColumns = useMemo(
    () =>
      createEmployeeListColumns({
        handleSort,
        order: getParams().get("order"),
        currentOrderField: getParams().get("orderBy"),
      }),
    [getParams, handleSort]
  );
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 ">Branches</h2>
      <div className=" bg-white rounded-lg  mb-2 border flex items-center justify-between py-2 px-4">
        <SearchInput
          placeholder="Search"
          className="max-w-60 w-full "
          onSearch={(value) => debouncedSearch(value)}
          onClearSearch={handleClearSearch}
        />

        <div className="flex items-center gap-2 flex-1">
          <SelectDropdown
            value={BRANCH_STATUS_OPTIONS.find(
              (el) => el.value === searchParams.get("status")
            )}
            onChange={handleStatusChange}
            placeholder="Status"
            options={BRANCH_STATUS_OPTIONS}
            icon="Filter"
            className="w-full max-w-24 ml-auto"
          />
          {getParamKeys().filter((el) => el !== "page").length > 0 && (
            <button
              className="p-2 text-xs border rounded hover:bg-slate-100"
              onClick={onClearFilters}
            >
              clear
            </button>
          )}
          <Can I="create" a="employees">
            <Link
              href={`/admin/users/employees/upsert`}
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
