import { states } from "~/data/states";
import { departments } from "~/data/departments";
import { SelectMenu } from "~/components/select-menu";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import { useState } from "react";
import { Link } from "react-router";
import DateTimePicker from "~/components/date-picker";
import { useSetEmployees, type Employee } from "~/components/context";

export default function Index() {
  const setEmployees = useSetEmployees();
  const [ShowConfirmationModal, setShowConfirmationModal] = useState(false);

  function saveEmployee(
    formData: FormData,
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const employee = Object.fromEntries(formData.entries()) as Employee;

    console.log(employee);

    setEmployees((current) => [...current, employee]);

    setShowConfirmationModal(true);
  }

  return (
    <>
      <h1 className="flex items-center justify-center text-3xl font-bold">
        HRnet
      </h1>
      <div className="flex flex-col items-center justify-center">
        <Link
          className="m-4 cursor-pointer text-purple-800 underline font-normal"
          to="/employees-list"
        >
          View Current Employees
        </Link>
        <h2 className="text-2xl font-bold mb-2">Create Employee</h2>

        <form
          onSubmit={(e) =>
            saveEmployee(new FormData(e.target as HTMLFormElement), e)
          }
          className="flex flex-col"
        >
          <Label label="firstName" value="First Name" />
          <Input name="firstName" type="text" />

          <Label label="lastName" value="Last Name" />
          <Input name="lastName" type="text" />

          <Label label="dateOfBirth" value="Date of Birth" />
          <DateTimePicker name="dateOfBirth" />

          <Label label="startDate" value="Start Date" />
          <DateTimePicker name="startDate" />

          <fieldset className="mt-2.5 p-4 w-72 border border-neutral-400">
            <legend>Address</legend>

            <Label label="street" value="Street" />
            <Input name="street" type="text" />

            <Label label="city" value="City" />
            <Input name="city" type="text" />

            <Label label="state" value="State" />
            <SelectMenu data={states} name="state" id="state" />

            <Label label="zipCode" value="Zip Code" />
            <Input name="zipCode" type="number" />
          </fieldset>

          <label htmlFor="department" className="block mt-3.5 mb-2">
            Department
          </label>
          <SelectMenu data={departments} name="department" id="department" />

          <div className="flex w-full justify-center content-center">
            <button
              className="flex mt-4 w-fit p-1 font-roboto text-sm font-normal bg-neutral-100 border border-neutral-400 rounded-sm cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {ShowConfirmationModal && (
        <div className="absolute flex z-10 bg-black/75 inset-0 h-screen w-screen justify-center items-center">
          <div className="absolute flex w-125 h-12 bg-white pt-3 pb-3 pl-6 pr-6 rounded-lg shadow-black shadow-md/50">
            <p>Employee Created!</p>
            <button
              className="absolute z-10 -right-3.5 -top-3.5 bg-black h-7.5 w-7.5 rounded-full p-2 cursor-pointer"
              onClick={() => setShowConfirmationModal(false)}
            >
              <div className="flex relative justify-center items-center">
                <div className="absolute z-20 h-0.5 w-3 bg-white rotate-45"></div>
                <div className="absolute z-30 h-0.5 w-3 bg-white rotate-135"></div>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
