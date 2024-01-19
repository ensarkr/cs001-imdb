import { Link } from "react-router-dom";
import { movieT } from "../../../typings/movie";
import { TVT } from "../../../typings/tv";
import styles from "./movieTVCard.module.css";
import { useFavorites } from "../../../context/FavoritesContext";
import { MouseEvent, useState } from "react";
import { useWatchlist } from "../../../context/WatchListContext";

export default function MovieTVCard({ data }: { data: movieT | TVT }) {
  return (
    <Link to={"/"} className={styles.main}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}
      ></img>

      <div className={styles.content}>
        <div className={styles.votePart}>
          <div className={styles.vote}>
            <svg
              width="0.8rem"
              height="0.8rem"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#f5c518"
              role="presentation"
            >
              <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
            </svg>
            <span>{data.voteAverage.toString().slice(0, 3)}</span>
          </div>

          <FavoriteButton data={data}></FavoriteButton>
        </div>

        <div className={styles.title}>{data.title}</div>
        <WatchlistButton data={data}></WatchlistButton>
        <div className={styles.trailer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path>
          </svg>
          Trailer
        </div>
      </div>
    </Link>
  );
}

function FavoriteButton({ data }: { data: movieT | TVT }) {
  const favorites = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.isFavorite(data);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isFavorite) {
      await favorites.removeFromFavorites(data);
    } else {
      await favorites.addToFavorites(data);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.favorite}>
      {favorites.data.status === "loading" || isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleClick} className={styles.favoriteButton}>
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(245, 197, 24, 1)" }}
            >
              <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(255, 255, 255, 1)" }}
            >
              <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

function WatchlistButton({ data }: { data: movieT | TVT }) {
  const watchlist = useWatchlist();
  const [isLoading, setIsLoading] = useState(false);

  const inWatchlist = watchlist.inWatchlist(data);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    if (inWatchlist) {
      await watchlist.removeFromWatchlist(data);
    } else {
      await watchlist.addToWatchlist(data);
    }
    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} className={styles.watchList}>
      {watchlist.data.status === "loading" || isLoading ? (
        <div className={[styles.loader, styles.blueLoader].join(" ")}></div>
      ) : (
        <>
          {inWatchlist ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
            </svg>
          )}
          <span>Watchlist</span>
        </>
      )}
    </button>
  );
}
