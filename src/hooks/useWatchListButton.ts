import { MouseEvent, useState } from "react";
import { useWatchlist } from "../context/WatchListContext";
import { movieT } from "../typings/movie";
import { TVT } from "../typings/tv";

/* 
 Watchlist button functionality
*/

export default function useWatchlistButton(data: movieT | TVT) {
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

  return {
    watchlistStatus: watchlist.data.status,
    isLoading,
    handleClick,
    inWatchlist,
  };
}
