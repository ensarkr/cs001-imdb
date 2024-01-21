import { useWatchlist } from "../../context/WatchListContext";
import styles from "./favoriteAndWatchlist.module.css";
import MovieTVWideDetailedCard from "../../components/movieTV/movieTVWideDetailedCard/MovieTVWideDetailedCard";
import { WideListWithNoFetch } from "../../components/wideList/WideList";
import { memo } from "react";
import WatchlistInformation from "../../components/watchlistInformation/WatchlistInformation";

const MovieTVWideDetailedCard_MEMO = memo(MovieTVWideDetailedCard);

export default function WatchListPage() {
  const watchlist = useWatchlist();

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Your Watchlist</h1>

        <WideListWithNoFetch>
          {watchlist.data.status === "user" &&
          watchlist.data.movies.length + watchlist.data.tvs.length > 0 ? (
            [...watchlist.data.movies, ...watchlist.data.tvs].map((e) => (
              <MovieTVWideDetailedCard_MEMO
                data={e}
                key={e.id}
              ></MovieTVWideDetailedCard_MEMO>
            ))
          ) : (
            <WatchlistInformation
              status={watchlist.data.status}
              color="black"
            ></WatchlistInformation>
          )}
        </WideListWithNoFetch>
      </div>
    </div>
  );
}
