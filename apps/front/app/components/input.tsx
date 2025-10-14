import type { ChangeEventHandler } from "react";

export function Input({
  name,
  type,
  onChange,
}: {
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="border border-neutral-500 rounded-sm max-w-43 h-5.5 font-roboto font-normal text-sm"
      id={name}
      name={name}
      type={type}
      required
      onChange={onChange}
    />
  );
}
