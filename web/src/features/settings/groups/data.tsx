import { Permissions } from "@/interfaces/user.interface";

export type PermissionGroup = {
  name: string;
  permissions: string[];
};

export function getGroupPermissions(): PermissionGroup[] {
  const permissions: string[] = Object.values(Permissions);
  const groupedPermissions = {};

  permissions.forEach((permission) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [entity, action] = permission.split(":");

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
