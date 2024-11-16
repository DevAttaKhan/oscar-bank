import { Switch } from "@headlessui/react";
import cn from "classnames";
import { getGroupPermissions } from "./data";
import { IPermission } from "@/interfaces/types";

interface PermissionManagerProps {
  permissionsList: IPermission[];
  activePermissions: number[];
  onTogglePermission: (permission: IPermission) => void;
  containerClassName?: string;
  groupClassName?: string;
  titleClassName?: string;
  permissionClassName?: string;
  labelClassName?: string;
  switchClassName?: string;
}

export const PermissionManager: React.FC<PermissionManagerProps> = ({
  permissionsList,
  activePermissions,
  onTogglePermission,
  containerClassName,
  groupClassName,
  titleClassName,
  permissionClassName,
  labelClassName,
  switchClassName,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-6",
        containerClassName
      )}
    >
      {getGroupPermissions(permissionsList || []).map((group) => (
        <div
          key={group.name}
          className={cn("border rounded p-2", groupClassName)}
        >
          <h4
            className={cn("capitalize text-lg font-bold mb-3", titleClassName)}
          >
            {group.name}
          </h4>
          <div>
            {group.permissions.map((permission) => (
              <div
                key={permission.id}
                className={cn(
                  "flex justify-between w-full mb-2",
                  permissionClassName
                )}
              >
                <label className={cn("capitalize", labelClassName)}>
                  {permission.name.split(":")[1]}
                </label>
                <Switch
                  checked={activePermissions.includes(permission.id)}
                  onChange={() => onTogglePermission(permission)}
                  className={cn(
                    "group relative flex h-6 w-12 cursor-pointer rounded-full bg-switch_unchecked p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-switch_checked",
                    switchClassName
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
                  />
                </Switch>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
