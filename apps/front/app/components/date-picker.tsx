import { useEffect, type ChangeEventHandler } from "react";

export default function DateTimePicker({ name }: { name: string }) {
  useEffect(() => {
    $(`#${name}`).datetimepicker({
      timepicker: false,
      format: "m/d/Y",
    });
  }, []);
  return (
    <>
      <input
        className="border border-neutral-500 rounded-sm max-w-43 h-5.5 font-roboto font-normal text-sm"
        id={name}
        name={name}
        type="text"
      ></input>
    </>
  );
}
