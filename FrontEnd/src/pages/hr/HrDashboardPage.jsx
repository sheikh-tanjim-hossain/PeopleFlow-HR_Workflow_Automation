import {
  CalendarDays,
  Check,
  ChevronRight,
  FolderKanban,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import { Link } from "react-router";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    description: "Across all departments",
    icon: Users,
  },
  {
    title: "Total Teams",
    value: "12",
    description: "Active teams",
    icon: UsersRound,
  },
  {
    title: "Total Projects",
    value: "36",
    description: "8 ongoing projects",
    icon: FolderKanban,
  },
];

const schedules = [
  {
    title: "Weekly HR Meeting",
    time: "09:30 AM - 10:30 AM",
    location: "Conference Room A",
    type: "Meeting",
  },
  {
    title: "Frontend Developer Interview",
    time: "11:00 AM - 12:00 PM",
    location: "Google Meet",
    type: "Interview",
  },
  {
    title: "Project Alpha Discussion",
    time: "02:00 PM - 03:00 PM",
    location: "Meeting Room B",
    type: "Meeting",
  },
  {
    title: "Monthly Team Review",
    time: "04:00 PM - 05:00 PM",
    location: "Conference Room A",
    type: "Review",
  },
];

const leaveRequests = [
  {
    name: "Ayesha Rahman",
    initials: "AR",
    department: "Engineering",
    type: "Casual Leave",
    date: "Nov 26 - Nov 27",
    days: "2 days",
  },
  {
    name: "Mahmud Karim",
    initials: "MK",
    department: "Marketing",
    type: "Sick Leave",
    date: "Nov 28",
    days: "1 day",
  },
  {
    name: "Sadia Islam",
    initials: "SI",
    department: "Design",
    type: "Annual Leave",
    date: "Dec 01 - Dec 04",
    days: "4 days",
  },
];

function StatCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-sm">
      <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary">
        <Icon size={22} />
      </div>

      <p className="mt-5 text-sm text-slate-500">{item.title}</p>

      <h3 className="mt-1 text-3xl font-bold text-slate-800">{item.value}</h3>

      <p className="mt-2 text-xs text-slate-400">{item.description}</p>
    </div>
  );
}

function Avatar({ initials }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
      {initials}
    </div>
  );
}

export default function HRDashboard() {
  return (
    <main className="min-h-screen bg-[#f3f8fc] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mt-1 text-2xl font-bold text-slate-800">
              HR Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <Link
            to="/hr/addEmployee"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            <Plus size={18} />
            Add Employee
          </Link>
        </header>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <StatCard key={item.title} item={item} />
          ))}
        </section>

        {/* Today's Schedule */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-slate-800">Today's Schedule</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your meetings and activities for today.
              </p>
            </div>

            <button className="flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              <CalendarDays size={17} />
              View Calendar
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 transition hover:border-primary/30 sm:flex-row sm:items-center"
              >
                {/* Time */}
                <div className="flex min-w-0 items-center gap-3 sm:min-w-40">
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    {schedule.type === "Interview" ? (
                      <Users size={19} />
                    ) : (
                      <Video size={19} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {schedule.time.split(" - ")[0]}
                    </p>
                    <p className="text-xs text-slate-400">
                      {schedule.time.split(" - ")[1]}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {schedule.title}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin size={13} />
                    {schedule.location}
                  </div>
                </div>

                {/* Type */}
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  {schedule.type}
                </span>

                <button className="self-start text-slate-400 hover:text-primary sm:self-auto">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            ))}
          </div>

          <button className="mt-5 flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all schedules
            <ChevronRight size={16} />
          </button>
        </section>

        {/* Leave Requests */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="font-semibold text-slate-800">Leave Requests</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review and manage employee leave applications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
                {leaveRequests.length} Pending
              </span>

              <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50">
                <Search size={17} />
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {leaveRequests.map((request) => (
              <div
                key={request.name}
                className="flex flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center sm:px-6"
              >
                {/* Employee */}
                <div className="flex items-center gap-3">
                  <Avatar initials={request.initials} />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {request.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {request.department}
                    </p>
                  </div>
                </div>

                {/* Leave details */}
                <div className="sm:min-w-36">
                  <p className="text-sm font-medium text-slate-700">
                    {request.type}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{request.date}</p>
                </div>

                {/* Duration */}
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {request.days}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Duration</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 rounded-lg border border-rose-100 px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50">
                    <X size={14} />
                    Reject
                  </button>

                  <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition hover:bg-primary/90">
                    <Check size={14} />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-4 text-center">
            <button className="text-sm font-medium text-primary hover:underline">
              View All Leave Requests
              <ChevronRight size={16} className="ml-1 inline" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
