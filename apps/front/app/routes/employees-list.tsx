import { Link } from "react-router";
// import Table from "~/components/table";
import { useEmployees } from "~/components/context";
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
import Button from "~/components/button";
import { Table } from "@aliasmerry/table";
type Column<D> = ColumnDef<D> & { accessorKey: keyof D };
type TableProps<D = { [key: string]: any }> = {
  columns: Column<D>[];
  data: D[];
};

function TableWithPagination<D>(props: TableProps<D>) {
  const [data, setData] = React.useState<D[]>(props.data || []);

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
      <Table columns={props.columns} data={data} />
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
export default function EmployeesList() {
  const { employees } = useEmployees();

  return (
    <div className="flex flex-col">
      <h1 className="flex items-center justify-center text-3xl font-bold">
        Current Employees
      </h1>
      <TableWithPagination
        data={employees}
        columns={[
          {
            id: "firstName",
            accessorKey: "firstName",
            header: () => "First Name",
          },
          {
            id: "lastName",
            accessorKey: "lastName",
            header: () => "Last Name",
          },
          {
            id: "dateOfBirth",
            accessorKey: "dateOfBirth",
            header: () => "Date of Birth",
          },
          {
            id: "startDate",
            accessorKey: "startDate",
            header: () => "Start Date",
          },
          {
            id: "department",
            accessorKey: "department",
            header: () => "Department",
          },
          {
            id: "street",
            accessorKey: "street",
            header: () => "Street",
          },
          {
            id: "city",
            accessorKey: "city",
            header: () => "City",
          },
          {
            id: "state",
            accessorKey: "state",
            header: () => "State",
          },
          {
            id: "zipCode",
            accessorKey: "zipCode",
            header: () => "Zip Code",
          },
        ]}
      />
      <div className="flex w-full justify-center">
        <Link
          className="mt-2 mb-5 text-sm cursor-pointer text-sky-900 uppercase font-semibold hover:transition hover:scale-102"
          to="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
