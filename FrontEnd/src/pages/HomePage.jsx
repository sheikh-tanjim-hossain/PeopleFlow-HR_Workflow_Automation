import { Menu, Users } from "lucide-react";
import { useState } from "react";
import { Outlet, useRouteLoaderData } from "react-router";
import RightSidebar from "../component/RightSidebar";
import EmployeeSidebar from "../component/employee/EmployeeSidebar";
import HrSidebar from "../component/hr/HrSidebar";

export default function HomePage() {
  const { user } = useRouteLoaderData("loggedIn") || {};
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Mobile & Tablet Slide-in Triggers */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 lg:hidden">
        <button
          type="button"
          onClick={() => setIsLeftOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
          aria-label="Open navigation menu"
        >
          <Menu size={16} className="text-primary" />
          <span>Menu</span>
        </button>

        <button
          type="button"
          onClick={() => setIsRightOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
          aria-label="Open team sidebar"
        >
          <Users size={16} className="text-primary" />
          <span>Team</span>
        </button>
      </div>

      {user?.role === "hr" ? (
        <HrSidebar
          isMobileOpen={isLeftOpen}
          onCloseMobile={() => setIsLeftOpen(false)}
        />
      ) : (
        <EmployeeSidebar
          isMobileOpen={isLeftOpen}
          onCloseMobile={() => setIsLeftOpen(false)}
        />
      )}

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>

      <RightSidebar
        isMobileOpen={isRightOpen}
        onCloseMobile={() => setIsRightOpen(false)}
      />
    </div>
  );
}
