import { Navigate, Outlet, useParams, useRouteLoaderData } from "react-router";

export default function EditProfileProtected() {
  const { user } = useRouteLoaderData("loggedIn");

  const { employeeid } = useParams();

  // Redirect if the user is not authorized
  if (String(user?._id) !== employeeid && user?.role !== "hr") {
    return <Navigate to={`/profile/${employeeid}`} replace />;
  }

  return <Outlet />;
}
