import { useState } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useSubmit } from "react-router";
export default function LoginPage() {
  // router form submit
  const submit = useSubmit();

  // action Data
  const actionData = useActionData();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
  });

  // handle form submission
  function handleLoginSubmit(data) {
    submit(data, { method: "post", encType: "application/json" });
  }

  // show password state
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f8fc] px-4 py-10 text-slate-800">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-third/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />

      {/* Login card */}
      <section className="relative w-full max-w-md rounded-[28px] border border-white/80 bg-white/65 p-7 shadow-[0_20px_80px_-25px_rgba(8,98,136,0.25)] backdrop-blur-2xl sm:p-10">
        {/* Brand */}
        <div className="mb-9 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to continue to your workspace.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleLoginSubmit)}>
          <div>
            {/* Email */}
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-700">{errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3 pr-20 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
                {...register("password", {
                  required: "A password is required",
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-700">
                  {errors.password.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 text-xs font-medium text-primary transition hover:text-secondary"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              <button
                type="button"
                className="absolute inset-y-0 right-3 text-xs font-medium text-primary transition hover:text-secondary"
              ></button>
            </div>
          </div>

          {!actionData?.success && (
            <p className="text-red-600 text-sm">{actionData?.message}</p>
          )}
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-[#064f6d] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
