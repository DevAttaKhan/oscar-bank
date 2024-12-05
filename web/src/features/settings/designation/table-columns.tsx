import { CellHeader } from "@/components/common/cell-header";
import { IDesignation } from "@/interfaces/designation.interface";
import { ColumnDef } from "@tanstack/react-table";

export const createDesignationListColumns = (
  props: any
): ColumnDef<IDesignation>[] => [
  {
    accessorKey: "title",
    header: CellHeader({
      header: "Designaion",
      orderBy: "title",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "employees",
    header: CellHeader({
      header: "Employees",
      orderBy: "employees",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "description",
    header: CellHeader({
      header: "Desc",
      orderBy: "description",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
];
