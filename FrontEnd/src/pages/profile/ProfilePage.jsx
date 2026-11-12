import { useContext } from "react";
import { NavLink, useLoaderData, useParams } from "react-router";
import { userContext } from "../../contexProvider";
import dpp from "./../../assets/dpp.jpg";
export default function ProfilePage() {
  const { data } = useLoaderData();
  let { employeeid } = useParams();
  const { user } = useContext(userContext);

  return (
    <div className="min-h-full bg-[#f3f8fc] p-5 md:p-8">
      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Employee Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View employee information and employment details.
        </p>
      </div>

      {/* Profile Header */}
      <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
        <div className="h-36 bg-linear-to-r from-primary via-[#24799e] to-secondary" />

        <div className="px-6 pb-6 md:px-8">
          <div className="-mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <img
                src={data?.img || dpp}
                alt={data?.name}
                className="h-28 w-28 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
              />

              <div className="pb-3 ">
                <h2 className="text-2xl font-bold tracking-tight capitalize text-white ">
                  {data?.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  {data?.role?.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">{data?.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pb-1">
              {/* Dont show edit profile */}
              {(user?._id == data?._id || user?.role === "hr") && (
                <NavLink
                  to={`/profile/edit/${data?._id}`}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary"
                >
                  Edit Profile
                </NavLink>
              )}

              <NavLink
                to={`/message/${employeeid}`}
                className="rounded-lg border border-primary/25 bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                Send Message
              </NavLink>

              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  data?.isEmployed
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                    : "bg-red-50 text-red-700 ring-1 ring-red-200"
                }`}
              >
                {data?.isEmployed ? "Active Employee" : "Not Employed"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="mt-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-7">
          <h3 className="text-lg font-bold text-gray-800">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Basic information about this employee.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Full Name
            </p>
            <p className="mt-2 font-semibold text-gray-700 capitalize">
              {data?.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Email Address
            </p>
            <p className="mt-2 break-all font-semibold text-gray-700">
              {data?.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Age
            </p>
            <p className="mt-2 font-semibold text-gray-700">
              {data?.age ? `${data?.age} Years` : "Not mentioned"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Designation
            </p>
            <p className="mt-2 font-semibold text-gray-700 capitalize">
              {data?.role?.title}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Employee ID
            </p>
            <p className="mt-2 break-all font-mono text-sm font-semibold text-gray-700">
              {data?._id}
            </p>
          </div>
        </div>
      </section>

      {/* Employment Overview */}
      <section className="mt-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            Employment Overview
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Current employment information and status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-primary/10 bg-[#f3f8fc] p-5 transition hover:border-primary/30">
            <p className="text-sm font-medium text-gray-500">
              Employment Status
            </p>
            <p className="mt-3 text-xl font-bold text-primary">
              {data?.isEmployed ? "Employed" : "Not Employed"}
            </p>
          </div>

          <div className="rounded-xl border border-primary/10 bg-[#f3f8fc] p-5 transition hover:border-primary/30">
            <p className="text-sm font-medium text-gray-500">
              Current Designation
            </p>
            <p className="mt-3 text-xl font-bold text-primary capitalize">
              {data?.role?.title}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
