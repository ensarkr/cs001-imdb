import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./pages/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import { FavoritesProvider } from "./context/FavoritesContext";
import { WatchlistProvider } from "./context/WatchListContext";
import MovieTVDetail from "./pages/movieTVDetail/MovieTVDetail";
import { requestMovieDetails, requestTVDetails } from "./functions/requests";
import SearchPage from "./pages/searchPage/SearchPage";
import FavoritesPage from "./pages/favoriteAndWatchlist/FavoritesPage";
import WhatToWatchLayout from "./pages/whatToWatch/whatToWatchLayout/WhatToWatchLayout";
import {
  FromYourWatchlist,
  TopIMDb,
  TopPicks,
} from "./pages/whatToWatch/movieTVListPart/MovieTVListPart";
import WatchListPage from "./pages/favoriteAndWatchlist/WatchListPage";
import ActorCredits from "./pages/actorCredits/ActorCredits";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import ErrorPage from "./pages/errorPage/ErrorPage";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/watchlist",
        element: <WatchListPage></WatchListPage>,
      },
      {
        path: "/favorites",
        element: <FavoritesPage></FavoritesPage>,
      },
      {
        element: <MovieTVDetail></MovieTVDetail>,
        path: ":type/:id/detail",
        loader: async ({ params }) => {
          if (params.type === "movie") {
            const res = await requestMovieDetails(
              parseInt(params.id as string)
            );
            return res;
          }
          if (params.type === "tv") {
            const res = await requestTVDetails(parseInt(params.id as string));
            return res;
          }
          return { status: false };
        },
      },
      {
        element: <ActorCredits></ActorCredits>,
        path: ":actorId/credits",
      },
      {
        element: <SearchPage></SearchPage>,
        path: "search/:query",
      },
      {
        element: <WhatToWatchLayout></WhatToWatchLayout>,
        children: [
          {
            path: "/whatToWatch/topPicks",
            element: <TopPicks></TopPicks>,
          },
          {
            path: "/whatToWatch/fromYourWatchlist",
            element: <FromYourWatchlist></FromYourWatchlist>,
          },
          {
            path: "/whatToWatch/topIMDb",
            element: <TopIMDb></TopIMDb>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecentlyViewedProvider>
    <AuthProvider>
      <FavoritesProvider>
        <WatchlistProvider>
          <RouterProvider router={router} />
        </WatchlistProvider>
      </FavoritesProvider>
    </AuthProvider>
  </RecentlyViewedProvider>
);
