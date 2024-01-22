import { Link } from "react-router-dom";
import { movieT } from "../../../typings/movie";
import { TVT } from "../../../typings/tv";
import styles from "./movieTVCard.module.css";
import FavoriteButton from "../../favoriteButton/FavoriteButton";
import Icon from "../../icon/Icon";
import CircleLoader from "../../circleLoader/CircleLoader";
import useWatchlistButton from "../../../hooks/useWatchListButton";

/*
Renders movie/tv card

Which css width property is used chosen via useAlternativeWidth prop
  width: var(--card-width);
  width: var(--alternative-card-width);

Movie or tv can be added to watchlist or favorite using rendered button
Movie or tv can be removed from watchlist or favorite using rendered button

By clicking user can navigate to movie/tv detail page
*/

export default function MovieTVCard({
  data,
  color = "black",
  useAlternativeWidth,
}: {
  data: movieT | TVT;
  color?: "black" | "white";
  useAlternativeWidth?: boolean;
}) {
  return (
    <Link
      to={`/${data.type}/${data.id}/detail`}
      className={[
        styles.main,
        useAlternativeWidth ? styles.alternativeWidth : "",
      ].join(" ")}
    >
      <div
        className={[
          styles.border,
          color === "white" ? styles.whiteBackground : "",
        ].join(" ")}
      >
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}
        ></img>

        <div className={styles.content}>
          <div className={styles.votePart}>
            <div className={styles.vote}>
              <Icon type="star" height="1.2rem"></Icon>

              <span>{data.voteAverage.toString().slice(0, 3)}</span>
            </div>

            <FavoriteButton
              unCheckedHeartColor={color === "white" ? "black" : "white"}
              data={data}
              height="80%"
            ></FavoriteButton>
          </div>

          <div className={styles.title}>{data.title}</div>
          <WatchlistButton data={data}></WatchlistButton>
          <div className={styles.trailer}>
            <Icon
              type="play"
              color={color === "white" ? "black" : "white"}
              height="80%"
            />
            Trailer
          </div>
        </div>
      </div>
    </Link>
  );
}

function WatchlistButton({ data }: { data: movieT | TVT }) {
  const { handleClick, inWatchlist, isLoading, watchlistStatus } =
    useWatchlistButton(data);

  return (
    <button onClick={handleClick} className={styles.watchList}>
      {watchlistStatus === "loading" || isLoading ? (
        <CircleLoader color="var(--blue-color)" height="60%"></CircleLoader>
      ) : (
        <>
          {inWatchlist ? (
            <Icon type="check" color="var(--blue-color)" height="70%" />
          ) : (
            <Icon type="plus" color="var(--blue-color)" height="70%" />
          )}
          <span>Watchlist</span>
        </>
      )}
    </button>
  );
}
