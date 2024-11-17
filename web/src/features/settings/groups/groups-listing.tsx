"use client";
import {
  ConfirmationModal,
  Lucide,
  PaginationControl,
  SearchInput,
} from "@/components/common";
import { SelectDropdown } from "@/components/ui";
import { useParamsNavigation } from "@/hooks";
import { BRANCH_STATUS_OPTIONS } from "@/lib/constants/branch.constants";
import { Can } from "@/providers/ability.provider";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { AddGroupModal } from "./add-group-modal";
import { PermissionsService } from "@/services/permissions.service";
import { useSession } from "next-auth/react";
import {
  IApiError,
  IApiResponse,
  IPermission,
  Result,
} from "@/interfaces/types";
import { toast } from "react-toastify";
import { GroupListItem } from "./group-list-item";
import { IGroup } from "@/interfaces/groups.interface";
import { GroupsService } from "@/services/groups.service";
import { useRouter } from "next/navigation";

type Props = {
  groups: Result<IGroup>;
};

export const GroupsListing: React.FC<Props> = ({ groups }) => {
  const [selectedGroups, setSelectedGroups] = useState<number[] | number>();
  const [permissionsList, setPermissionsList] = useState<IPermission[] | []>(
    []
  );
  const session = useSession();
  const router = useRouter();
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

  const handlePageChange = (page) => {
    const params = getParams();
    params.set("page", page);
    navigateWithQueryParams(params);
  };

  const handleSelectGroup = (type: "single" | "bulk", id) => {
    if (type === "single") {
      setSelectedGroups(id);
      return;
    }
    const groupIds = Array.isArray(selectedGroups) ? selectedGroups : [];
    const exists = groupIds?.includes(id);

    if (exists) {
      const filteredGroups = groupIds?.filter((el) => el !== id);
      setSelectedGroups(filteredGroups);
    } else {
      setSelectedGroups([...groupIds, id]);
    }
  };

  console.log(selectedGroups);

  const handleRemoveGroup = async () => {
    try {
      if (!selectedGroups) throw new Error("No Group is Selected");
      toast.loading("Updating Group", {
        toastId: "group-delete",
      });
      const res = await GroupsService.delete(
        selectedGroups,
        session.data?.user.token
      );
      if ((res as IApiResponse<IGroup>).statusCode !== 200)
        throw new Error((res as IApiError).message);

      toast.update("group-delete", {
        render: "Group Deleted",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setSelectedGroups([]);
      router.refresh();
    } catch (error: any) {
      toast.update("group-delete", {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await PermissionsService.list({
          token: session.data?.user.token,
          options: { cache: "force-cache" },
        });
        if (res?.statusCode === 200) {
          setPermissionsList(
            (res as IApiResponse<IPermission>)
              .result as unknown as IPermission[]
          );
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, [session.data?.user.token]);

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
        <div className=" mt-5">
          {groups.data.map((el) => (
            <GroupListItem
              key={el.name}
              data={el}
              permissionsList={permissionsList}
              onSelectGroup={handleSelectGroup}
              isSelected={
                Array.isArray(selectedGroups) && selectedGroups.includes(el.id)
              }
            />
          ))}
        </div>

        <PaginationControl meta={groups.meta} gotoPage={handlePageChange} />
      </div>
      <AddGroupModal
        isOpen={isAddGroupModalOpen}
        permissionsList={permissionsList}
        onClose={() => setIsAddGroupModalOpen(false)}
      />
      <ConfirmationModal
        isOpen={!Array.isArray(selectedGroups) && Boolean(selectedGroups)}
        onClose={() => setSelectedGroups(undefined)}
        message="Are you sure you want to remove this group?"
        onConfirm={handleRemoveGroup}
      />
    </>
  );
};

export default GroupsListing;
