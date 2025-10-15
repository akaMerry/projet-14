export default function SelectMenu({
  data,
  name,
  id,
  onChange,
}: {
  data: { name: string; value: string | number }[];
  name: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      className="bg-neutral-100 border border-neutral-400 rounded-sm font-roboto text-sm text-neutral-700 p-1"
      defaultValue={data[0].value}
      name={name}
      id={id}
      required
      onChange={onChange}
    >
      {data.map((d, index) => (
        <option
          key={index}
          className="text-neutral-800 font-roboto"
          value={d.value}
        >
          {d.name}
        </option>
      ))}
    </select>
  );
}
