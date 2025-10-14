import { Link } from "react-router";
import { EmployeesTable } from "~/components/table";

export default function EmployeesList() {
  return (
    <div className="flex flex-col">
      <h1 className="flex items-center justify-center text-3xl font-bold">
        Current Employees
      </h1>
      <EmployeesTable />
      <div className="flex w-full justify-center">
        <Link to="/" className="text-purple-800 underline">
          Home
        </Link>
      </div>
    </div>
  );
}
