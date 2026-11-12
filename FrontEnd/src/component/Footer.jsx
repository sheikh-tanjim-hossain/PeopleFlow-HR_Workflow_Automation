export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-[#f3f8fc] px-6 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm font-semibold text-primary">PeopleFlow</p>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} PeopleFlow. All rights reserved.
        </p>

        <p className="text-xs text-gray-500">
          Simplifying workforce management.
        </p>
      </div>
    </footer>
  );
}
