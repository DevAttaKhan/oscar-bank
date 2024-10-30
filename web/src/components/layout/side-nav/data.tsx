import { icons } from "lucide-react";

// nav.types.ts
export interface NavItem {
  label: string; // Display name for the route
  route: string; // Route path
  exact?: boolean;
  icon?: keyof typeof icons; // Optional icon name or path
  children?: NavItem[]; // Optional sub-items for nesting
  roles?: string[]; // Optional array of roles allowed to view this item
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
          label: "Users List",
          route: "/admin/users/all",
          icon: "Dot",
        },
        {
          label: "Create User",
          route: "/admin/users/upsert",
          icon: "Dot",
        },
        {
          label: "Permission Groups",
          route: "/admin/users/groups",
          icon: "Dot",
        },
      ],
    },
    {
      label: "Branch Management",
      route: "/admin/branches",
      icon: "HousePlus",
      children: [
        {
          label: "All Branches",
          route: "/admin/branches/all",
          exact: true,
          icon: "Dot",
        },
        {
          label: "Create Branch",
          route: "/admin/branches/create",
          exact: true,
          icon: "Dot",
        },
      ],
    },

    {
      label: "Settings",
      route: "/super-admin/settings",
      icon: "Settings",
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
