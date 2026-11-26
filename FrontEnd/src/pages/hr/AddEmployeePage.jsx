import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";
import dpp from "../../assets/dpp.jpg";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/**
 * HR page for creating a new employee account (/hr/addEmployee).
 */
export default function AddEmployeePage() {
  const { roles = [], error: loaderError } = useLoaderData() || {};
  const actionData = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  const [preview, setPreview] = useState(dpp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      age: "",
      address: "",
      salary: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password with useWatch for React Compiler compatibility
  const password = useWatch({
    control,
    name: "password",
  });

  useEffect(() => {
    return () => {
      if (preview !== dpp) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handlePictureChange = (event) => {
    const file = event.target.files?.[0];
    setPreview(
      file && ALLOWED_IMAGE_TYPES.includes(file.type)
        ? URL.createObjectURL(file)
        : dpp,
    );
  };

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("name", values.name.trim());
    formData.append("email", values.email.trim());
    formData.append("age", String(values.age));
    formData.append("address", values.address.trim());
    formData.append("salary", String(values.salary));
    formData.append("role", values.role);
    formData.append("password", values.password);

    if (values.profilePicture?.[0]) {
      formData.append("profilePicture", values.profilePicture[0]);
    }

    submit(formData, {
      method: "post",
      action: "/hr/addEmployee",
      encType: "multipart/form-data",
    });
  };

  return (
    <div className="min-h-full bg-[#f3f8fc] p-4 sm:p-5 md:p-8">
      {/* Page Heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          Add Employee
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new employee account and profile details.
        </p>
      </div>

      {(actionData?.error || loaderError) && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {actionData?.error || loaderError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Profile Picture Section */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
          <div className="h-28 bg-linear-to-r from-primary via-[#24799e] to-secondary sm:h-32" />

          <div className="flex flex-col gap-4 px-4 pb-5 sm:flex-row sm:items-end sm:gap-5 sm:px-6 sm:pb-6 md:px-8">
            <div className="-mt-12 sm:-mt-14">
              <img
                src={preview}
                alt="Employee profile"
                className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md sm:h-28 sm:w-28"
              />
            </div>

            <div className="min-w-0 flex-1 pb-1">
              <h2 className="text-lg font-bold text-gray-800">
                Profile Picture
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Upload a profile picture for this employee.
              </p>

              <input
                id="profilePicture"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                {...register("profilePicture", {
                  onChange: handlePictureChange,
                  validate: {
                    fileType: (files) => {
                      const file = files?.[0];
                      if (!file) return true;
                      return (
                        ALLOWED_IMAGE_TYPES.includes(file.type) ||
                        "Only JPG, PNG, and WEBP images are allowed"
                      );
                    },
                    fileSize: (files) =>
                      !files?.[0] ||
                      files[0].size <= MAX_IMAGE_SIZE ||
                      "Image must be smaller than 5MB",
                  },
                })}
                className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:font-semibold file:text-primary hover:file:bg-primary/20"
              />

              {errors.profilePicture && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.profilePicture.message}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Supported formats: JPG, PNG, WEBP. Maximum size: 5MB.
              </p>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="mb-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7">
            <h3 className="text-lg font-bold text-gray-800">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Enter the employee's personal and employment details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must contain at least 3 characters",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Enter full name"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Enter email address"
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Age
              </label>

              <input
                id="age"
                type="number"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    !Number.isNaN(value) || "Age must be a valid number",
                  min: {
                    value: 18,
                    message: "Age must be at least 18",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Enter age"
              />

              {errors.age && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Address
              </label>

              <input
                id="address"
                type="text"
                {...register("address", {
                  required: "Address is required",
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Enter Address"
              />

              {errors.address && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label
                htmlFor="salary"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Monthly Salary
              </label>

              <input
                id="salary"
                type="number"
                {...register("salary", {
                  required: "Salary is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    !Number.isNaN(value) || "Salary must be a valid number",
                  min: {
                    value: 0,
                    message: "Salary cannot be negative",
                  },
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                placeholder="Enter monthly salary"
              />

              {errors.salary && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.salary.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Designation / Role
              </label>

              <select
                id="role"
                {...register("role", {
                  required: "Role is required",
                })}
                className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.title}
                  </option>
                ))}
              </select>

              {errors.role && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Account Password */}
        <section className="mb-6 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7">
            <h3 className="text-lg font-bold text-gray-800">
              Account Password
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Set the initial login password for this employee.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    deps: ["confirmPassword"],
                  })}
                  className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 pr-16 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:text-secondary"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm the password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full rounded-lg border border-gray-200 bg-[#f9fbfd] px-4 py-3 pr-16 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white"
                  placeholder="Confirm password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary hover:text-secondary"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col-reverse items-stretch justify-end gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
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
            {isSubmitting ? "Creating..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
