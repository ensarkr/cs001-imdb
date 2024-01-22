import { useEffect, memo } from "react";
import useFetchPages from "../../../hooks/useFetchPages";
import { pageFetchDouble } from "../../../typings/global";
import { movieT } from "../../../typings/movie";
import DotLoader from "../../../components/dotLoader/dotLoader";
import WideLoadMoreButton from "../../../components/wideLoadMoreButton/WideLoadMoreButton";
import styles from "./movieTVListPart.module.css";
import MovieTVCard from "../../../components/movieTV/movieTVCard/MovieTVCard";
import {
  requestPopularMovies,
  requestTopRatedMovies,
} from "../../../functions/requests";
import { useWatchlist } from "../../../context/WatchListContext";
import WatchlistInformation from "../../../components/watchlistInformation/WatchlistInformation";

const MovieTVCard_MEMO = memo(MovieTVCard);

export default function MovieTVListPart({
  fetchFunction,
}: {
  fetchFunction: (page: number) => pageFetchDouble<{ data: movieT[] }>;
}) {
  const { data, fetchNextPage, fetchReset, fetchStatus, fetchErrorMessage } =
    useFetchPages(fetchFunction, true);

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <div className={styles.main}>
      {fetchStatus === "loading" && data === undefined ? (
        <DotLoader color="white" height="500px"></DotLoader>
      ) : fetchStatus === "error" ? (
        <div onClick={() => fetchReset()} className={styles.center}>
          <p>{fetchErrorMessage}</p>
          <button className={styles.retry}>click to retry</button>
        </div>
      ) : (
        <div className={styles.list}>
          {data &&
            data.map((e) => (
              <MovieTVCard_MEMO
                key={e.id}
                data={e}
                useAlternativeWidth
              ></MovieTVCard_MEMO>
            ))}
          {(fetchStatus === "fetchable" || fetchStatus === "loading") && (
            <WideLoadMoreButton
              fetchNextPage={fetchNextPage}
              fetchStatus={fetchStatus}
            ></WideLoadMoreButton>
          )}
        </div>
      )}
    </div>
  );
}

export function TopPicks() {
  return (
    <MovieTVListPart fetchFunction={requestPopularMovies}></MovieTVListPart>
  );
}
export function TopIMDb() {
  return (
    <MovieTVListPart fetchFunction={requestTopRatedMovies}></MovieTVListPart>
  );
}

export function FromYourWatchlist() {
  const watchlist = useWatchlist();

  return (
    <div className={styles.main}>
      {watchlist.data.status === "user" &&
      watchlist.data.movies.length + watchlist.data.tvs.length > 0 ? (
        <div className={styles.list}>
          {[...watchlist.data.movies, ...watchlist.data.tvs].map((e) => (
            <MovieTVCard_MEMO
              data={e}
              key={e.id}
              useAlternativeWidth
            ></MovieTVCard_MEMO>
          ))}
        </div>
      ) : (
        <WatchlistInformation
          status={watchlist.data.status}
          color="white"
        ></WatchlistInformation>
      )}
    </div>
  );
}
