import { Permissions } from "@/interfaces/user.interface";
import { icons } from "lucide-react";

// nav.types.ts
export interface NavItem {
  label: string; // Display name for the route
  route: string; // Route path
  exact?: boolean;
  icon?: keyof typeof icons; // Optional icon name or path
  children?: NavItem[]; // Optional sub-items for nesting
  permissions?: Permissions[]; // Optional array of permissions allowed to view this item
}

export const sidebarConfig: Record<string, NavItem[]> = {
  admin: [
    {
      label: "Dashboard",
      route: "/admin",
      icon: "Grid2x2",
      exact: true,
    },
    {
      label: "User Management",
      route: "/admin/users",
      icon: "UserRound",
      children: [
        {
          label: "Customeres",
          route: "/admin/users/customers",
          icon: "Dot",
        },
        {
          label: "Employees",
          route: "/admin/users/Employees",
          icon: "Dot",
        },
      ],
    },
    {
      label: "Branch Management",
      route: "/admin/branches",
      icon: "HousePlus",
      permissions: [Permissions.BRANCH_LIST, Permissions.BRANCH_CREATE],
      children: [
        {
          label: "All Branches",
          route: "/admin/branches",
          exact: true,
          icon: "Dot",
          permissions: [Permissions.BRANCH_LIST],
        },
        {
          label: "Create Branch",
          route: "/admin/branches/create",
          exact: true,
          icon: "Dot",
          permissions: [Permissions.BRANCH_CREATE],
        },
      ],
    },

    {
      label: "Settings",
      route: "/admin/settings",
      icon: "Settings",
      permissions: [Permissions.GROUPS_MANAGE, Permissions.PERMISSIONS_MANAGE],
      children: [
        {
          label: "Groups",
          route: "/admin/settings/groups",
          exact: true,
          icon: "Dot",
          permissions: [
            Permissions.GROUPS_MANAGE,
            Permissions.PERMISSIONS_MANAGE,
          ],
        },
      ],
    },
  ],
  internal: [
    {
      label: "Dashboard",
      route: "/employee/dashboard",
      icon: "Grid2x2",
    },
    {
      label: "Tasks",
      route: "/employee/tasks",
      icon: "Grid2x2",
    },
    {
      label: "Profile",
      route: "/employee/profile",
      icon: "Grid2x2",
    },
  ],
  dashboard: [
    {
      label: "My Dashboard",
      route: "/customer/dashboard",
      icon: "Grid2x2",
    },
    {
      label: "Accounts",
      route: "/customer/accounts",
      icon: "Grid2x2",
      children: [
        { label: "View Accounts", route: "/customer/accounts/view" },
        { label: "Transactions", route: "/customer/accounts/transactions" },
      ],
    },
    {
      label: "Support",
      route: "/customer/support",
      icon: "Grid2x2",
    },
  ],
};
