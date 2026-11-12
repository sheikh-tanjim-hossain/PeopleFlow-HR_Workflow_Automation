import { LogOut } from "lucide-react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { userContext } from "../contexProvider";
import api from "../lib/axios";

export default function Header() {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  function handleLogout() {
    api
      .post("/auth/logout")
      .then((response) => {
        console.log(response.data);
        setUser();
        navigate("/auth/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <header className="relative flex h-16 w-full items-center justify-center border-b border-white/10 bg-linear-to-r from-primary via-[#24799e] to-secondary px-4 shadow-lg">
      <NavLink className="text-3xl font-bold tracking-tight text-white shadow-lg">
        PeopleFlow
      </NavLink>

      {user?.name && (
        <button
          type="button"
          onClick={handleLogout}
          className="absolute right-4 rounded-lg p-2 text-white transition hover:bg-white/15 hover:text-fourth"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut
            size={30}
            strokeWidth={3}
            className="lg:mr-4 lg:block hidden"
          />
        </button>
      )}
    </header>
  );
}
