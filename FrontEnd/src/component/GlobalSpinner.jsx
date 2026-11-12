export default function GlobalSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f8fc]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}
