import { useRef } from "react";

export default function Input({
  name,
  type,
  onChange,
}: {
  name: string;
  type: string;

  onChange?: (value: string) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  // ?? relire la doc => ref
  const ref = useRef<HTMLInputElement>(null!);

  const clear = () => {
    ref.current.value = "";

    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="flex min-w-45 flex-row justify-between rounded-sm border border-neutral-500">
      <input
        className="pl-1 flex w-9/10 h-5.5 font-roboto font-normal text-sm outline-0 peer"
        ref={ref}
        tabIndex={0}
        aria-label={`${name} input`}
        id={name}
        name={name}
        type={type}
        required
        onChange={(event) => onChange?.(event.target.value)}
        placeholder=" "
      />
      {/* {value.length > 0 && ( */}
      <div className="flex-end peer-[&:not(:placeholder-shown)]:flex hidden">
        <button
          className="ml-1 mr-1 w-1/10 fa-solid fa-x scale-75 text-sky-950 cursor-pointer"
          aria-label="clear input"
          type="button"
          onClick={clear}
        />
      </div>
      {/* )} */}
    </div>
  );
}
