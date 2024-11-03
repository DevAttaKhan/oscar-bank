import { IBranch } from "@/interfaces/branch.interface";
import { ColumnDef } from "@tanstack/react-table";

export const createBranchListColumns = (action: any): ColumnDef<IBranch>[] => [
  { accessorKey: "name", header: "Branch Name" },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "phone", header: "Contact" },
  { accessorKey: "city", header: "City" },
];
