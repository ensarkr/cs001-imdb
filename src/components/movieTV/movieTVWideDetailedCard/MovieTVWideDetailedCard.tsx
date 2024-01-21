import { Link } from "react-router-dom";
import { movieT } from "../../../typings/movie";
import { TVT } from "../../../typings/tv";
import styles from "./movieTVWideDetailedCard.module.css";
import FavoriteButton from "../../favoriteButton/FavoriteButton";
import Icon from "../../icon/Icon";
import CircleLoader from "../../circleLoader/CircleLoader";
import useWatchlistButton from "../../../hooks/useWatchListButton";

export default function MovieTVWideDetailedCard({
  data,
}: {
  data: movieT | TVT;
}) {
  return (
    <Link
      to={`/${data.type}/${data.id}/detail`}
      className={[styles.main].join(" ")}
    >
      <div className={styles.image}>
        <WatchlistButtonAbsolute data={data}></WatchlistButtonAbsolute>

        <img src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}></img>
      </div>

      <div className={styles.content}>
        <h3>{data.title}</h3>
        <p>{data.releaseDate}</p>
        <div className={styles.stats}>
          <span className={styles.vote}>
            <Icon type="star" height="60%"></Icon>{" "}
            {data.voteAverage.toString().slice(0, 3)}
          </span>
          <FavoriteButton
            data={data}
            unCheckedHeartColor="black"
            height="65%"
          ></FavoriteButton>
          <span>{Math.floor(data.popularity)}</span>
        </div>
        <p className={styles.overview}>{data.overview}</p>
      </div>
    </Link>
  );
}

function WatchlistButtonAbsolute({ data }: { data: movieT | TVT }) {
  const { handleClick, inWatchlist, isLoading, watchlistStatus } =
    useWatchlistButton(data);

  return (
    <button onClick={handleClick} className={styles.watchlist}>
      <div className={styles.background}>
        <svg
          width="24px"
          height="34px"
          viewBox="0 0 24 34"
          xmlns="http://www.w3.org/2000/svg"
          fill={inWatchlist ? "#93C862" : "rgb(0,0,0,0.4)"}
        >
          <polygon points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
          <polygon points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"></polygon>
          <polygon points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"></polygon>
        </svg>
      </div>
      <div className={styles.foreground}>
        {watchlistStatus === "loading" || isLoading ? (
          <CircleLoader color="white" height="60%"></CircleLoader>
        ) : (
          <>
            {inWatchlist ? (
              <Icon type="check" color="white" height="100%" />
            ) : (
              <Icon type="plus" color="white" height="100%" />
            )}
          </>
        )}
      </div>
    </button>
  );
}
