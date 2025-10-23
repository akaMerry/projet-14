import { useEffect } from "react";

export default function SelectMenu({
  options,
  name,
  onChange,
}: {
  options: { label: string; value: string | number }[];
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  // ??
  useEffect(() => {
    $(`#${name}`).selectmenu();
  }, []);

  return (
    <select
      className="bg-neutral-100 border border-neutral-400 rounded-sm font-roboto text-sm text-neutral-700 p-1"
      defaultValue={options[0].value}
      name={name}
      id={name}
      required
      onChange={onChange}
    >
      {options.map((d, index) => (
        <option
          key={index}
          className="text-neutral-800 font-roboto"
          value={d.value}
        >
          {d.label}
        </option>
      ))}
    </select>
  );
}
