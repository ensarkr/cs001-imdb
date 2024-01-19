import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/auth/signIn/SignIn";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./pages/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import { FavoritesProvider } from "./context/FavoritesContext";
import { WatchlistProvider } from "./context/WatchListContext";

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
