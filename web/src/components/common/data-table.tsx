"use client";
import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setTable?: (table: Table<TData>) => void;
  // table: TanstackTable<TData>; //HERE
  meta?: any;
  isLoading?: boolean;
  tableClass?: string;
  headRowClass?: string;
  bodyRowClass?: string;
  perPage?: number;
  gotoPage?: (page: { selected: number }) => void;
  perPageLimit?: (value: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  tableClass,
  headRowClass,
  bodyRowClass,
  perPage,
  setTable,
  gotoPage,
  perPageLimit,
}: DataTableProps<TData, TValue>) {
  //STATES:
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //row selection
    onRowSelectionChange: setRowSelection,
    //sorting:
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
    //pagination:
    getPaginationRowModel: getPaginationRowModel(),
    //Order of columns
    onColumnOrderChange: setColumnOrder,

    //filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    //Faceted filters:
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),

    //Visibility:
    onColumnVisibilityChange: setColumnVisibility,

    //Control pagination. Default is 10
    initialState: {
      // pagination: { pageSize: 5 },
    },

    //This can be added to insert custom functions, accessible :table.options.meta.methodName
    meta: {
      myOwnMethod: () => {
        console.log("Custom method");
      },
    },
  });

  useEffect(() => {
    if (!table) return;
    setTable && setTable(table);
  }, [setTable, table]);

  return (
    <div>
      {data.length > 0 ? (
        <div className={` ${tableClass} table`}>
          <div className="thead">
            {table.getHeaderGroups().map((headerGroup) => (
              <div className={`tr  ${headRowClass}`} key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <div className="th " key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="tbody">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div
                  className={`tr  ${bodyRowClass}`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div className="td  " key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </div>
        </div>
      ) : (
        <h1>no data fallback</h1>
      )}

      <div className="flex flex-col sm:flex-row  justify-between items-center pt-4">
        {/* {meta && <DataTablePagination meta={meta} gotoPage={gotoPage} />} */}
      </div>
    </div>
  );
}
