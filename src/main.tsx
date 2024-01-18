import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/auth/SignIn/SignIn";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <div>
            <Link to={"/auth/signIn"}>sign in page</Link>
          </div>
        ),
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
    <RouterProvider router={router} />
  </AuthProvider>
);
