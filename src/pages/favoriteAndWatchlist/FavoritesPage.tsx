import { Link } from "react-router-dom";
import styles from "./favoriteAndWatchlist.module.css";
import Icon from "../../components/icon/Icon";
import MovieTVWideDetailedCard from "../../components/movieTV/movieTVWideDetailedCard/MovieTVWideDetailedCard";
import { useFavorites } from "../../context/FavoritesContext";
import { WideListWithNoFetch } from "../../components/wideList/WideList";
import DotLoader from "../../components/dotLoader/dotLoader";
import { memo } from "react";

const MovieTVWideDetailedCard_MEMO = memo(MovieTVWideDetailedCard);

export default function FavoritesPage() {
  const favorites = useFavorites();

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Your Favorites</h1>

        <WideListWithNoFetch>
          {favorites.data.status === "loading" ? (
            <div className={styles.center}>
              <DotLoader color="white"></DotLoader>
            </div>
          ) : favorites.data.status === "guest" ? (
            <div className={styles.center}>
              <Icon type="heart" height="3rem" color="black"></Icon>

              <h4>Sign in to access your favorites</h4>
              <p>Favorite shows and movies to keep track of what you liked.</p>
              <Link to={"/signin"} className={styles.button}>
                Sign in to IMDb
              </Link>
            </div>
          ) : favorites.data.movies.length + favorites.data.tvs.length === 0 ? (
            <div className={styles.center}>
              <Icon type="heart" height="3rem" color="black"></Icon>
              <h4>No available releases</h4>
              <p>
                Favorite more shows and movies to keep track of what you liked.
              </p>
              <Link to={"/whatToWatch/topPicks"} className={styles.button}>
                Browse popular movies
              </Link>
            </div>
          ) : (
            [...favorites.data.movies, ...favorites.data.tvs].map((e) => (
              <MovieTVWideDetailedCard_MEMO
                data={e}
                key={e.id}
              ></MovieTVWideDetailedCard_MEMO>
            ))
          )}
        </WideListWithNoFetch>
      </div>
    </div>
  );
}
