import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import React from "react";
type Column<D> = ColumnDef<D> & { accessorKey: keyof D };
type TableProps<D = { [key: string]: any }> = {
  columns: Column<D>[];
  data: D[];
};

export default function Table<D>(props: TableProps<D>) {
  // table
  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>
      props.columns.map((col) => ({ ...col, cell: (info) => info.getValue() })),
    []
  );

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data: props.data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="pt-3 pb-3 pl-5 pr-5 text-sm text-white uppercase bg-sky-800 border border-white tracking-wider border-x-2 rounded-t-2xl hover:transition hover:scale-102 hover:bg-sky-700"
                    tabIndex={0}
                  >
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {props.data.length < 1 ? (
          <tbody>
            <tr>
              <td
                className="p-5 align-center text-center border-b-2 border-b-neutral-400"
                colSpan={9}
              >
                no data
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr
                  key={row.id}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-sky-50"
                      : "bg-gray-100 hover:bg-sky-50"
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-3 border-b-2 border-x-1 border-x-neutral-200 border-b-neutral-400"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
}
