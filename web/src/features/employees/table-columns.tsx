import { CellHeader } from "@/components/common/cell-header";
import { IEmployee } from "@/interfaces/employee.interface";
import { ColumnDef } from "@tanstack/react-table";

export const createEmployeeListColumns = (
  props: any
): ColumnDef<IEmployee>[] => [
  {
    accessorKey: "employeeCode",
    header: CellHeader({
      header: "Code",
      orderBy: "code",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
  },
  {
    accessorKey: "name",
    header: CellHeader({
      header: "Name",
      orderBy: "name",
      order: props.order,
      handler: props.handleSort,
      currentOrderField: props.currentOrderField,
    }),
    cell: ({ row }) => row.original.firstName + " " + row.original.lastName,
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  { accessorKey: "phone", header: "Contact" },
  {
    accessorKey: "employmentStatus",
    header: "Status",
  },
  {
    accessorKey: "employmentType",
    header: "Employement Type",
  },
];
