import { CellHeader } from "@/components/common/cell-header";
import { IBranch } from "@/interfaces/branch.interface";
import { ColumnDef } from "@tanstack/react-table";

export const createBranchListColumns = (props: any): ColumnDef<IBranch>[] => [
  {
    accessorKey: "name",
    header: CellHeader({
      header: "Branch Name",
      orderBy: "name",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "code",
    header: CellHeader({
      header: "Code",
      orderBy: "code",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "email",
    header: CellHeader({
      header: "Email",
      orderBy: "email",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "status",
    header: CellHeader({
      header: "Status",
      orderBy: "status",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  { accessorKey: "phone", header: "Contact" },
  {
    accessorKey: "city",
    header: CellHeader({
      header: "City",
      orderBy: "city",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
];
