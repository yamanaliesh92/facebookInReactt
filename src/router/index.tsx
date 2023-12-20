import { FC, PropsWithChildren } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "../components/profile/profile";

import Auth from "../page/auth/auth";

import Home from "../page/home/home";

import { PrivateRouter } from "./private";
import { PublicRouter } from "./public";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicRouter>
        <Auth />
      </PublicRouter>
    ),
  },

  {
    path: "/",
    element: (
      <PrivateRouter>
        <Home />
      </PrivateRouter>
    ),
  },
  {
    path: "/Myhome",
    element: (
      <PrivateRouter>
        <Profile />
      </PrivateRouter>
    ),
  },
]);

export const MainRouterProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <RouterProvider router={router}></RouterProvider>;
};
