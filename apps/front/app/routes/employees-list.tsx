import { Link } from "react-router";
import Table from "~/components/table";
import { useEmployees } from "~/components/context";

export default function EmployeesList() {
  const { employees } = useEmployees();

  return (
    <div className="flex flex-col">
      <h1 className="flex items-center justify-center text-3xl font-bold">
        Current Employees
      </h1>
      <Table
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
