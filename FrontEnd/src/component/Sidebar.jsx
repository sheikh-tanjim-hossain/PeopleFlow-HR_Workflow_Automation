import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-400 bg-white p-4 mr-10 mt-8">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 font-medium transition border-b-2 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`
          }
        >
          Overview
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 font-medium transition border-b-2 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/departments"
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 font-medium transition border-b-2 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`
          }
        >
          Departments
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 font-medium transition border-b-2 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`
          }
        >
          Attendance
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 font-medium transition border-b-2 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
