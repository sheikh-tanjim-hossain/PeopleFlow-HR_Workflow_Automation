import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import dpp from "./../assets/dpp.jpg";

export default function RightSidebar() {
  const { user, allEmployee } = useLoaderData();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative h-screen shrink-0 transition-all duration-300 ease-in-out hidden lg:block ${
        isOpen ? "w-72" : "w-0"
      }`}
    >
      <aside
        className={`absolute right-0 top-0 flex h-full w-72 flex-col border-l border-gray-200 bg-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Profile */}
        <Link
          to={`profile`}
          className="flex flex-col items-center border-b border-gray-200 px-4 py-6"
        >
          <img
            src={user?.img || dpp}
            alt="Profile"
            className="h-20 w-20 rounded-full border-4 border-secondary/20 object-cover"
          />

          <h2 className="mt-3 text-lg font-bold text-gray-800">{user?.name}</h2>

          <p className="text-sm text-gray-500 uppercase">{user?.role?.title}</p>
        </Link>

        {/* Members Heading */}
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="font-semibold text-gray-700">
            Team Members
            <span className="ml-2 rounded-full bg-secondary/20 px-2 py-1 text-xs text-primary">
              {allEmployee.length}
            </span>
          </h3>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="flex flex-col gap-2">
            {allEmployee.map((emp) => (
              <Link
                to={`profile/${emp?._id}`}
                key={emp?._id}
                className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-gray-100"
              >
                <img
                  src={emp?.img || dpp}
                  alt={emp?.name}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-gray-700">
                    {emp?.name}
                  </h4>

                  <p className="truncate text-xs text-gray-500">
                    {emp?.role?.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Collapse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-5 bottom-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-secondary"
      >
        {isOpen ? "▶" : "◀"}
      </button>
    </div>
  );
}
