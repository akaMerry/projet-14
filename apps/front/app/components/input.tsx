import { useEffect, useState } from "react";

export default function Input({
  name,
  type,
  onChange,
}: {
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
    if (onChange) {
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex min-w-45 flex-row justify-between rounded-sm border border-neutral-500">
      <input
        className="pl-1 flex w-9/10 h-5.5 font-roboto font-normal text-sm outline-0"
        tabIndex={0}
        aria-label={`${name} input`}
        id={name}
        name={name}
        type={type}
        value={value}
        required
        onChange={handleChange}
      />
      {value.length > 0 && (
        <div className="flex flex-end">
          <button
            className="ml-1 mr-1 w-1/10 fa-solid fa-x scale-75 text-sky-950 cursor-pointer"
            aria-label="clear input"
            type="submit"
            onClick={clear}
          />
        </div>
      )}
    </div>
  );
}
