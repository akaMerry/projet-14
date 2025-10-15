export default function Button({
  name,
  onClick,
}: {
  name: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <>
      <button
        className="pt-2 pb-2 pl-3 pr-3 m-1 cursor-pointer rounded bg-sky-900 text-white hover:transition hover:scale-102"
        type="submit"
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
}
