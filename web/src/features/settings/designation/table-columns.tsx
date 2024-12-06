import { Lucide } from "@/components/common";
import { CellHeader } from "@/components/common/cell-header";
import { DropdownMenu } from "@/components/ui";
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
    cell: ({ row }) => row.original.employees ?? 0,
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu
          options={[
            {
              label: "Edit",
              icon: <Lucide name="Pencil" size={20} color="#718EBF" />,
              funtion: () => props.onEdit(row.original),
            },
            {
              label: "Delete",
              icon: <Lucide name="Trash2" size={20} color="#718EBF" />,
              funtion: () => props.onDelete(row.original),
            },
          ]}
        />
      );
    },
  },
];
