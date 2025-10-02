import { lazy } from "react";
const MainPage = lazy(() => import("./pages/Main/MainPage"));
const NewsPage = lazy(() => import("./pages/News/NewsPage"));
const ResultsPage = lazy(() => import("./pages/Results/ResultsPage"));

export const routes = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/results",
    children: [
      { index: true, element: <MainPage /> },
      { path: ":type/:q", element: <ResultsPage /> },
    ],
  },
  {
    path: "/khabar/:cat?",
    element: <NewsPage />,
  },
  {
    path: "/*",
    element: <MainPage />,
  },
];
