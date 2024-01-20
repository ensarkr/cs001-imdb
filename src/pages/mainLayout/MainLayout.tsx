import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useLayoutEffect } from "react";

export default function MainLayout() {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
}
