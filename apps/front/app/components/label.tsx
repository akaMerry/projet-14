export default function Label({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <label
      htmlFor={label}
      className="block mt-3.5 mb-2 text-sky-900 font-medium"
    >
      {value}
    </label>
  );
}
