import { Outlet } from "react-router";

export default function Home() {
  return (
    <main className="flex flex-col relative items-center justify-center pt-6 pb-4 font-roboto">
      <Outlet />
    </main>
  );
}
