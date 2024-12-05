import { Lucide } from "@/components/common";
import { IGroup } from "@/interfaces/groups.interface";
import React, { useState } from "react";
import { PermissionManager } from "./permission-manager";
import { IPermission } from "@/interfaces/types";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { CreateGroupSchema } from "@/lib/schema/groups.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui";
import { areArraysEqual } from "@/lib/utils/common.util";
import { updateGroupAction } from "@/lib/actions/groups.actions";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  data: IGroup;
  isSelected: boolean;
  permissionsList: IPermission[];
  onSelectGroup: (type: "single" | "bulk", id: number) => void;
};

export const GroupListItem: React.FC<Props> = ({
  data,
  isSelected,
  permissionsList,
  onSelectGroup,
}) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { executeAsync } = useAction(updateGroupAction, {
    onExecute: () => {
      toast.loading("Updating Group", {
        toastId: "updating-group",
      });
    },
    onSuccess: () => {
      toast.update("updating-group", {
        render: "Group Saved ",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.refresh();
    },

    onError: ({ error: { serverError } }) => {
      toast.update("updating-group", {
        render: serverError,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      id: data.id,
      permissions: data?.permissions?.map((el) => el.id),
      name: data.name,
      description: data.description,
    },
  });

  const permissions = watch("permissions");

  const handleTogglePermission = (permission) => {
    if (permissions.includes(permission.id)) {
      setValue(
        "permissions",
        permissions.filter((p) => p !== permission.id)
      );
    } else {
      setValue("permissions", [...permissions, permission.id]);
    }
  };

  const handleUpdate = async (values) => {
    const res = await executeAsync(values);
    if (res?.data?.statusCode === 200) {
      setIsEditing(false);
    }
  };

  return (
    <div className="   rounded-lg border bg-white mb-4">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="px-4  h-[50px] flex items-center justify-between w-full cursor-pointer border-b"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Lucide
              name="SquareCheck"
              color={isSelected ? "red" : "gray"}
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                onSelectGroup("bulk", data.id);
              }}
            />
            {!isEditing ? (
              <p className="text-base">{data.name}</p>
            ) : (
              <span onClick={(e) => e.stopPropagation()}>
                <Input
                  placeholder="name"
                  {...register("name")}
                  error={errors.name?.message}
                />
              </span>
            )}
            <span
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing((prev) => !prev);
              }}
            >
              <Lucide
                name={isEditing ? "CircleX" : "Pencil"}
                color="#718EBF"
                size={20}
                className="p-1 cursor-pointer"
              />
            </span>
            {(isEditing ||
              !areArraysEqual(
                data.permissions?.map((el) => el.id),
                permissions
              )) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  handleSubmit(handleUpdate)();
                }}
                className="border rounded-lg py-2 px-3 text-xs    hover:bg-slate-100"
              >
                update
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-lg   bg-green-600 text-white text-xs px-3">
            {data.permissions?.length}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSelectGroup("single", data.id);
            }}
          >
            <Lucide
              name={"Trash"}
              color="#718EBF"
              className="p-1 border rounded hover:bg-slate-100"
            />
          </span>
          <Lucide
            name="ChevronDown"
            color="#718EBF"
            className="p-1 border rounded hover:bg-slate-100"
          />
        </div>
      </div>

      <div
        className={cn("overflow-auto transition-all ", [
          open ? "max-h-96 p-4" : "max-h-0",
        ])}
      >
        <PermissionManager
          activePermissions={permissions}
          permissionsList={permissionsList}
          onTogglePermission={handleTogglePermission}
        />
      </div>
    </div>
  );
};
