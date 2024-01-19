import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from "./mainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Navbar></Navbar>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
