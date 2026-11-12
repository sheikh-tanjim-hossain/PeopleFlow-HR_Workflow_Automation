import { useContext, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router";
import { userContext } from "../../contexProvider";

export default function ProtectedRoutes() {
  const { setUser } = useContext(userContext);

  const { user } = useLoaderData();

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return <Outlet />;
}
