import { icons } from "lucide-react";

// nav.types.ts
export interface NavItem {
  label: string; // Display name for the route
  route: string; // Route path
  pattern?: string;
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
    },
    {
      label: "Branches",
      route: "/admin/branches",
      pattern: "/admin/branches/*",
      icon: "HousePlus",
    },
    {
      label: "User Management",
      route: "/super-admin/users",
      icon: "UserRound",
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
