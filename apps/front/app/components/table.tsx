import Input from "~/components/input";
import SelectMenu from "~/components/select-menu";
import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  type ColumnFiltersState,
  type ColumnDef,
  getSortedRowModel,
} from "@tanstack/react-table";
import Button from "./button";
type Column<D> = ColumnDef<D> & { accessorKey: keyof D };
type TableProps<D = { [key: string]: any }> = {
  columns: Column<D>[];
  data: D[];
};

export default function Table<D>(props: TableProps<D>) {
  const [data, setData] = React.useState<D[]>(props.data);

  const [sliceValue, setSliceValue] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * sliceValue;

  const endIndex = startIndex + sliceValue;

  const entries = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  function search(e: string) {
    const searchValue = e.toLowerCase();

    if (searchValue.length === 0) {
      setData(props.data);
    } else {
      const filtered = props.data.filter((d: any) =>
        Object.values(d).some((value) =>
          (value as string).toString().toLowerCase().includes(searchValue)
        )
      );
      setData(filtered);
    }
  }

  function display(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSliceValue = parseInt(e.target.value);
    setSliceValue(newSliceValue);
    setCurrentPage(1);
  }

  function previous() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function next() {
    const totalPages = Math.ceil(data.length / sliceValue);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

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
    data,
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
      <div className="flex justify-between items-center mt-10 mb-6">
        <div className="flex items-center">
          <p className="mr-1">Show</p>
          <SelectMenu options={entries} name="entries" onChange={display} />
          <p className="ml-1">entries</p>
        </div>
        <div className="flex items-center">
          <p className="mr-1">Search :</p>
          <Input name="search" type="text" onChange={search} />
        </div>
      </div>

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
        {data.length < 1 ? (
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
      <div className="mt-10 mb-5 flex justify-between items-center">
        <div>
          <p>
            Showing {data.length > 1 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, data.length)} of {data.length}{" "}
            {data.length > 1 ? "entries" : "entry"}
          </p>
        </div>
        <div className="flex flex-row items-center">
          <Button name="Previous" onClick={previous} />
          <p className="p-1 m-1 text-neutral-600">{currentPage}</p>
          <Button name="Next" onClick={next} />
        </div>
      </div>
    </>
  );
}
