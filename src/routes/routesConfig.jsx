import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./mainLayout.jsx";

import Movies from "../Components/Movies.jsx";
import TVShows from "../Components/TVShows.jsx";
import Search from "../Components/Search.jsx";
import Details from "../Components/Details.jsx";
import  {HomePage} from "../Pages/Home/Home.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies", element: <Movies /> },
      { path: "tvshows", element: <TVShows /> },
      { path: "search/multi", element: <Search /> },
      { path: "details/:type/:id", element: <Details /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default routes;
