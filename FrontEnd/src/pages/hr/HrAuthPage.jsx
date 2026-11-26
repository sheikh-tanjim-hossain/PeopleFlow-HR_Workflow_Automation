import { Navigate, Outlet, useRouteLoaderData } from "react-router";

/**
 * Route guard for HR-only routes.
 * Redirects non-HR users to the employee dashboard.
 */
export default function HrAuthPage() {
  const data = useRouteLoaderData("loggedIn");
  const user = data?.user;

  if (user?.role !== "hr") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
