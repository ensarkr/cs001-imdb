import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/signIn/SignIn";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./pages/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import { FavoritesProvider } from "./context/FavoritesContext";
import { WatchlistProvider } from "./context/WatchListContext";
import MovieTVDetail from "./pages/movieTVDetail/MovieTVDetail";
import { requestMovieDetails, requestTVDetails } from "./functions/requests";

const router = createBrowserRouter([
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/signIn",
        element: <SignIn></SignIn>,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <FavoritesProvider>
      <WatchlistProvider>
        <RouterProvider router={router} />
      </WatchlistProvider>
    </FavoritesProvider>
  </AuthProvider>
);
