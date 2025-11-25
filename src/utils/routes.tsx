import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "../components/layout/AdminLayout";
import { SignIn } from "../components/pages/SignIn";
import { Dashboard } from "../components/pages/Dashboard";
import { Bars } from "../components/pages/Bars";
import { Users } from "../components/pages/Users";
import { Advertisement } from "../components/pages/Advertisement";
import { Settings } from "../components/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "bars", Component: Bars },
      { path: "users", Component: Users },
      { path: "advertisement", Component: Advertisement },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/signin" replace />,
  },
]);
