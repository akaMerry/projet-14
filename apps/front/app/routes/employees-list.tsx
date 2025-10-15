import { Link } from "react-router";
import EmployeesTable from "~/components/table";

export default function EmployeesList() {
  return (
    <div className="flex flex-col">
      <h1 className="flex items-center justify-center text-3xl font-bold">
        Current Employees
      </h1>
      <EmployeesTable />
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
