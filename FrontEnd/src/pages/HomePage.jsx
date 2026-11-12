import { Outlet } from "react-router";
import RightSidebar from "../component/RightSidebar";
import Sidebar from "../component/Sidebar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
      <RightSidebar />
    </div>
  );
}
