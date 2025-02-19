"use client";
import { DataTable } from "@/components/common/data-table";
import { useCallback, useMemo, useState } from "react";
import { ResponseMeta } from "@/interfaces/types";
import { Lucide, PaginationControl, SearchInput } from "@/components/common";
import { useParamsNavigation } from "@/hooks";
import { Can } from "@/providers/ability.provider";
import { debounce } from "lodash";
import { IDesignation } from "@/interfaces/designation.interface";
import { createDesignationListColumns } from "./table-columns";
import { UpsertDesignationModal } from "./upsert-designation.modal";

type Props = {
  data: IDesignation[];
  meta: ResponseMeta;
};
export const DesignationListingTable: React.FC<Props> = ({ data, meta }) => {
  const [designation, setDesignation] = useState<
    IDesignation | boolean | undefined
  >();
  const { navigateWithQueryParams, getParams, getParamKeys } =
    useParamsNavigation();

  const handlePageChange = (page) => {
    const params = getParams();
    params.set("page", page);
    navigateWithQueryParams(params);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = getParams();
      params.set("page", "1");
      params.set("fields", "title");
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

  const handleEditDesignation = (designation: IDesignation) => {
    setDesignation(designation);
  };

  const DesignationListColumns = useMemo(
    () =>
      createDesignationListColumns({
        handleSort,
        order: getParams().get("order"),
        currentOrderField: getParams().get("orderBy"),
        onEdit: handleEditDesignation,
      }),
    [getParams, handleSort]
  );
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-2 ">Designations</h2>
        <div className=" bg-white rounded-lg  mb-2 border flex items-center justify-between py-2 px-4">
          <SearchInput
            placeholder="Search"
            className="max-w-60 w-full "
            onSearch={(value) => debouncedSearch(value)}
            onClearSearch={handleClearSearch}
          />

          <div className="flex items-center justify-end gap-2 flex-1">
            {getParamKeys().filter((el) => el !== "page").length > 0 && (
              <button
                className="p-2 text-xs border rounded hover:bg-slate-100"
                onClick={onClearFilters}
              >
                clear
              </button>
            )}
            <Can I="create" a="designation">
              <button
                onClick={() => setDesignation(true)}
                className="p-2 border rounded hover:bg-slate-100"
              >
                <Lucide name="Plus" size={16} />
              </button>
            </Can>
          </div>
        </div>
        <DataTable columns={DesignationListColumns} data={data} />
        <PaginationControl meta={meta} gotoPage={handlePageChange} />
      </div>
      <UpsertDesignationModal
        isOpen={!!designation}
        onClose={() => setDesignation(false)}
        designation={
          typeof designation !== "boolean"
            ? (designation as IDesignation)
            : undefined
        }
      />
    </>
  );
};
