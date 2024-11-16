import { IPermission } from "@/interfaces/types";

export type PermissionGroup = {
  name: string;
  permissions: IPermission[];
};

export function getGroupPermissions(
  permissions: IPermission[]
): PermissionGroup[] {
  const groupedPermissions = {};

  permissions.forEach((permission) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [entity, action] = permission.name.split(":");

    // If the entity does not exist in the groupedPermissions, add it
    if (!groupedPermissions[entity]) {
      groupedPermissions[entity] = {
        name: entity,
        permissions: [],
      };
    }

    // Push the permission to the entity's permissions array
    groupedPermissions[entity].permissions.push(permission);
  });

  // Convert the object into an array of grouped permissions
  return Object.values(groupedPermissions);
}
