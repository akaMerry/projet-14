import { Input } from "~/components/input";
import { SelectMenu } from "~/components/select-menu";
import React, { useEffect, useState } from "react";
import { useEmployees } from "./context";
import { type Employee } from "~/components/context";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  type ColumnFiltersState,
  type ColumnDef,
  getSortedRowModel,
} from "@tanstack/react-table";

export function EmployeesTable() {
  const allEmployees = useEmployees();

  const [employees, setEmployees] = useState(allEmployees);

  const [sliceValue, setSliceValue] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * sliceValue;

  const endIndex = startIndex + sliceValue;

  const entries = [
    { name: "10", value: 10 },
    { name: "25", value: 25 },
    { name: "50", value: 50 },
    { name: "100", value: 100 },
  ];

  function search(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue.length === 0) {
      setEmployees(allEmployees);
    } else {
      const filtered = allEmployees.filter((employee: Employee) =>
        Object.values(employee).some((value) =>
          value.toString().toLowerCase().includes(searchValue)
        )
      );
      setEmployees(filtered);
      console.log(employees.length);
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
    const totalPages = Math.ceil(employees.length / sliceValue);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  // table
  const columns = React.useMemo<ColumnDef<Employee, any>[]>(
    () => [
      {
        id: "firstName",
        accessorKey: "firstName",
        header: () => "First Name",
        cell: (info) => info.getValue(),
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: () => "Last Name",
        cell: (info) => info.getValue(),
      },
      {
        id: "dateOfBirth",
        accessorKey: "dateOfBirth",
        header: () => "Date of Birth",
        cell: (info) => info.getValue(),
      },
      {
        id: "startDate",
        accessorKey: "startDate",
        header: () => "Start Date",
        cell: (info) => info.getValue(),
      },
      {
        id: "department",
        accessorKey: "department",
        header: () => "Department",
        cell: (info) => info.getValue(),
      },
      {
        id: "street",
        accessorKey: "street",
        header: () => "Street",
        cell: (info) => info.getValue(),
      },
      {
        id: "city",
        accessorKey: "city",
        header: () => "City",
        cell: (info) => info.getValue(),
      },
      {
        id: "state",
        accessorKey: "state",
        header: () => "State",
        cell: (info) => info.getValue(),
      },
      {
        id: "zipCode",
        accessorKey: "zipCode",
        header: () => "Zip Code",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [data, setData] = React.useState<Employee[]>(employees);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  useEffect(() => {
    setData(employees);
  }, [employees]);

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
      <div className="flex justify-between items-center mt-10 mb-5">
        <div className="flex items-center">
          <p className="mr-1">Show</p>
          <SelectMenu
            data={entries}
            name="entries"
            id="entries"
            onChange={display}
          />
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
                  <th key={header.id} colSpan={header.colSpan} className="p-2">
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
        {employees.length < 1 ? (
          <tbody>no matching data</tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-2">
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
      <div className="mt-1 flex justify-between items-center">
        <div>
          <p>
            Showing {employees.length > 1 ? startIndex + 1 : 0} to{" "}
            {Math.min(endIndex, employees.length)} of {employees.length}{" "}
            {employees.length > 1 ? "entries" : "entry"}
          </p>
        </div>
        <div className="flex flex-row">
          <button
            className="p-1 m-1 cursor-pointer rounded border border-neutral-400 bg-neutral-50"
            onClick={previous}
          >
            Previous
          </button>
          <p className="p-1 m-1 text-neutral-600">{currentPage}</p>
          <button
            className="p-1 m-1 cursor-pointer rounded border border-neutral-400 bg-neutral-50"
            onClick={next}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
