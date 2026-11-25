import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";

/**
 * HR-only page for creating new employee roles (/hr/createRole).
 */
export default function CreateRolePage() {
  const { roles = [], error: loaderError } = useLoaderData() || {};
  const actionData = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      responsibility: "",
      description: "",
    },
  });

  useEffect(() => {
    if (actionData?.success) {
      reset();
    }
  }, [actionData, reset]);

  const onSubmit = (values) => {
    submit(
      {
        title: values.title.trim(),
        responsibility: values.responsibility.trim(),
        description: values.description.trim(),
      },
      {
        method: "post",
        action: "/hr/createRole",
        encType: "application/json",
      },
    );
  };

  return (
    <div className="min-h-full bg-[#f3f8fc] p-4 sm:p-5 md:p-8">
      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Create Role
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Define a new designation, its responsibilities, and description.
        </p>
      </div>

      {actionData?.success && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {actionData.message}
        </div>
      )}

      {(actionData?.error || loaderError) && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionData?.error || loaderError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Role Details */}
        <section className="mb-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7">
            <h2 className="text-lg font-bold text-gray-800">Role Details</h2>
            <p className="mt-1 text-sm text-gray-400">
              Enter the role title and optional details for this position.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Role Title
              </label>

              <input
                id="title"
                type="text"
                {...register("title", {
                  required: "Role title is required",
                  validate: (value) =>
                    value.trim().length >= 2 ||
                    "Role title must contain at least 2 characters",
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="e.g. Software Engineer"
              />

              {errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Responsibility */}
            <div>
              <label
                htmlFor="responsibility"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Responsibility
              </label>

              <textarea
                id="responsibility"
                rows={3}
                {...register("responsibility")}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Outline the primary responsibilities for this role"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={4}
                {...register("description")}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Describe the role scope and expectations"
              />
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="mb-6 flex flex-col-reverse items-stretch justify-end gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
          <button
            type="button"
            onClick={() => navigate("/hr/dashboard")}
            className="w-full rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Creating..." : "Create Role"}
          </button>
        </div>
      </form>

      {/* Existing Roles */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Existing Roles</h2>
            <p className="mt-1 text-sm text-gray-400">
              Currently available roles in the organization.
            </p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {roles.length} Total
          </span>
        </div>

        {roles.length === 0 ? (
          <p className="text-sm text-gray-400">No roles created yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {roles.map((role) => {
              const employeeCount = role.employeeCount ?? 0;

              return (
                <div
                  key={role._id}
                  className="rounded-xl border border-gray-200 bg-[#f9fbfd] p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 capitalize">
                      {role.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {employeeCount}{" "}
                      {employeeCount === 1 ? "Employee" : "Employees"}
                    </span>
                  </div>
                  {role.responsibility && (
                    <p className="mt-1 text-xs text-gray-600">
                      <span className="font-semibold">Responsibility:</span>{" "}
                      {role.responsibility}
                    </p>
                  )}
                  {role.description && (
                    <p className="mt-1 text-xs text-gray-500">
                      {role.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
