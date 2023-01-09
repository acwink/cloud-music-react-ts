import React from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import Home from "../application/Home";

const Recommend = React.lazy(() => import("../application/Recommend"));
const Singers = React.lazy(() => import("../application/Singers"));
const Rank = React.lazy(() => import("../application/Rank"));
const Album = React.lazy(() => import("@/application/Album"));
const Singer = React.lazy(() => import("@/application/Singer"));
const Search = React.lazy(() => import("@/application/Search"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        index: true,
        element: <Navigate to="recommend" />,
      },
      {
        path: "recommend",
        element: <Recommend />,
        children: [
          {
            path: "/recommend/:id",
            element: <Album />,
          },
        ],
      },
      {
        path: "singers",
        element: <Singers />,
        children: [
          {
            path: "/singers/:id",
            element: <Singer />,
          },
        ],
      },
      {
        path: "rank",
        element: <Rank />,
        children: [
          {
            path: "/rank/:id",
            element: <Album />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "album/:id",
        index: true,
        element: <Album />,
      },
    ],
  },
];

export default routes;
