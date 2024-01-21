import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./whatToWatchLayout.module.css";

export default function WhatToWatchLayout() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>What to Watch - IMDb</h1>

        <Tabs></Tabs>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

type tabsT = "topPicks" | "fromYourWatchlist" | "topIMDb";

function Tabs() {
  const { pathname } = useLocation();

  const tab = pathname.split("/")[pathname.split("/").length - 1] as tabsT;

  return (
    <div className={styles.tabs}>
      <Link
        to={"/whatToWatch/topPicks"}
        className={[
          styles.tab,
          tab === "topPicks" ? styles.activeTab : "",
        ].join(" ")}
      >
        TOP PICKS
      </Link>
      <Link
        to={"/whatToWatch/fromYourWatchlist"}
        className={[
          styles.tab,
          tab === "fromYourWatchlist" ? styles.activeTab : "",
        ].join(" ")}
      >
        FROM YOUR WATCHLIST
      </Link>
      <Link
        to={"/whatToWatch/topIMDb"}
        className={[styles.tab, tab === "topIMDb" ? styles.activeTab : ""].join(
          " "
        )}
      >
        TOP IMDb
      </Link>
    </div>
  );
}
