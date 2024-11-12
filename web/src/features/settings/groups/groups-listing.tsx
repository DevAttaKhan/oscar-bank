"use client";
import { Lucide, SearchInput } from "@/components/common";
import { SelectDropdown } from "@/components/ui";
import { useParamsNavigation } from "@/hooks";
import { BRANCH_STATUS_OPTIONS } from "@/lib/constants/branch.constants";
import { Can } from "@/providers/ability.provider";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { AddGroupModal } from "./add-group-modal";

export const GroupsListing = () => {
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const { navigateWithQueryParams, getParams, getParamKeys } =
    useParamsNavigation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = getParams();
      params.set("page", "1");
      params.set("fields", "name");
      params.set("search", value);
      navigateWithQueryParams(params);
    }, 500),
    [getParams, navigateWithQueryParams]
  );

  const handleClearSearch = () => {
    const params = getParams();
    params.delete("search");
    params.delete("fields");
    navigateWithQueryParams(params);
  };

  const onClearFilters = () => {
    const params = getParams();
    getParamKeys().forEach((el) => {
      params.delete(el);
    });
    navigateWithQueryParams(params);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-2 ">Groups</h2>
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
                (el) => el.value === getParams().get("status")
              )}
              onChange={() => {}}
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
            <Can I="manage" a="permissions">
              <button
                onClick={() => setIsAddGroupModalOpen(true)}
                className="p-2 border rounded hover:bg-slate-100"
              >
                <Lucide name="Plus" size={16} />
              </button>
            </Can>
          </div>
        </div>
      </div>
      <AddGroupModal
        isOpen={isAddGroupModalOpen}
        onClose={() => setIsAddGroupModalOpen(false)}
      />
    </>
  );
};

export default GroupsListing;
