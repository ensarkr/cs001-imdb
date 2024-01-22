import { Link } from "react-router-dom";
import { useWatchlist } from "../../context/WatchListContext";
import DotLoader from "../dotLoader/dotLoader";
import Icon from "../icon/Icon";
import styles from "./watchlistInformation.module.css";

/*
Renders information about watchlist

Default height is 500px
*/

export default function WatchlistInformation({
  status,
  color,
  height,
}: {
  status: ReturnType<typeof useWatchlist>["data"]["status"];
  color: "black" | "white";
  height?: string;
}) {
  const style = height === undefined ? undefined : { height: height };
  const className =
    color === "white" ? [styles.center, styles.white].join(" ") : styles.center;

  if (status === "loading") {
    return (
      <div className={className} style={style}>
        <DotLoader color={color === "black" ? "white" : "black"}></DotLoader>
      </div>
    );
  }

  if (status === "guest")
    return (
      <div className={className} style={style}>
        <Icon type="bookmark" height="3rem" color={color}></Icon>

        <h4>Sign in to access your Watchlist</h4>
        <p>Save shows and movies to keep track of what you want to watch.</p>
        <Link to={"/signin"} className={styles.button}>
          Sign in to IMDb
        </Link>
      </div>
    );

  if (status === "user") {
    return (
      <div className={className} style={style}>
        <Icon type="bookmark" height="3rem" color={color}></Icon>
        <h4>No available releases</h4>
        <p>
          Add more shows and movies to keep track of what you want to watch.
        </p>
        <Link to={"/whatToWatch/topPicks"} className={styles.button}>
          Browse popular movies
        </Link>
      </div>
    );
  }
}
