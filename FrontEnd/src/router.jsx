import { createBrowserRouter } from "react-router";
import loginAction from "./action/auth/loging.action";
import EditProfileAction from "./action/editProfile.action";
import App from "./App";
import GlobalSpinner from "./component/GlobalSpinner";
import GetLoggedInUserLoader from "./loader/GetLoggedInUserLoader";
import HomeLoader from "./loader/HomeLoader";
import EditProfileLoader from "./loader/profile/EditProfileLoader";
import ProfileLoader from "./loader/profile/ProfileLoader";
import LoginPage from "./pages/auth/LoginPage";
import ProtectedRoutes from "./pages/auth/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import EditProfileProtected from "./pages/profile/EditProfileProtected";
import MyProfilePage from "./pages/profile/MyProfilePage";
import ProfilePage from "./pages/profile/ProfilePage";
const router = createBrowserRouter([
  {
    Component: App,
    HydrateFallback: GlobalSpinner,
    children: [
      {
        path: "/auth/login",
        Component: LoginPage,
        action: loginAction,
      },
      {
        id: "loggedIn",
        loader: GetLoggedInUserLoader,
        Component: ProtectedRoutes,
        children: [
          {
            id: "home",
            loader: HomeLoader,
            path: "/",
            Component: HomePage,
            children: [
              {
                path: "profile",
                Component: MyProfilePage,
              },

              {
                path: "profile/:employeeid",
                loader: ProfileLoader,
                Component: ProfilePage,
              },
              {
                path: "profile/edit/:employeeid",
                Component: EditProfileProtected,

                action: EditProfileAction,
                children: [
                  {
                    index: true,
                    loader: EditProfileLoader,
                    Component: EditProfilePage,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
