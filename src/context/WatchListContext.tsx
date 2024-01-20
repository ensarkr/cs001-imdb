import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TVT } from "../typings/tv";
import { movieT } from "../typings/movie";
import { useAuth } from "./AuthContext";

import { useNavigate } from "react-router-dom";
import { requestAllWatchlist, requestToWatchlist } from "../functions/requests";

type wathlistT =
  | { status: "loading" }
  | { status: "guest" }
  | {
      status: "user";
      tvs: TVT[];
      movies: movieT[];
    };

const WatchlistContext = createContext<wathlistT>({ status: "loading" });
const SetWatchlistContext = createContext<React.Dispatch<
  React.SetStateAction<wathlistT>
> | null>(null);

function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, SetWatchlist] = useState<wathlistT>({
    status: "loading",
  });

  const auth = useAuth();

  useEffect(() => {
    if (auth.user.status === "user") {
      fetchAndSetWatchlist(auth.user.data.accountID, auth.user.data.sessionID);
    }

    if (auth.user.status === "guest") {
      SetWatchlist({ status: "guest" });
    }
  }, [auth.user.status]);

  const fetchAndSetWatchlist = async (accountID: number, sessionID: string) => {
    const res = await requestAllWatchlist(accountID, sessionID);

    if (res.status) {
      SetWatchlist({ status: "user", ...res.value });
    }
  };

  console.log("watchlist", watchlist);

  return (
    <>
      <SetWatchlistContext.Provider value={SetWatchlist}>
        <WatchlistContext.Provider value={watchlist}>
          {children}
        </WatchlistContext.Provider>
      </SetWatchlistContext.Provider>
    </>
  );
}

function useWatchlist() {
  const watchlist = useContext(WatchlistContext);
  const setWatchlist = useContext(SetWatchlistContext);
  const navigate = useNavigate();

  const auth = useAuth();

  if (setWatchlist === null) throw "setWatchlist unaccessible";

  const addToWatchlist = async (movieTV: movieT | TVT) => {
    if (auth.user.status === "loading") return false;

    if (auth.user.status === "guest") {
      navigate("/auth/signin");
      return;
    }

    if (auth.user.status === "user" && watchlist.status === "user") {
      const res = await requestToWatchlist(
        auth.user.data.accountID,
        movieTV.type,
        movieTV.id,
        true,
        auth.user.data.sessionID
      );

      if (res.status) {
        setWatchlist({
          status: "user",
          movies:
            movieTV.type === "movie"
              ? [movieTV, ...watchlist.movies]
              : watchlist.movies,
          tvs:
            movieTV.type === "tv" ? [movieTV, ...watchlist.tvs] : watchlist.tvs,
        });
      }

      return res.status;
    }

    return false;
  };

  const removeFromWatchlist = async (movieTV: movieT | TVT) => {
    if (auth.user.status === "loading") return false;

    if (auth.user.status === "guest") {
      navigate("/auth/signin");
    }

    if (auth.user.status === "user" && watchlist.status === "user") {
      const res = await requestToWatchlist(
        auth.user.data.accountID,
        movieTV.type,
        movieTV.id,
        false,
        auth.user.data.sessionID
      );

      if (res.status) {
        setWatchlist({
          status: "user",
          movies:
            movieTV.type === "movie"
              ? watchlist.movies.filter((e) => e.id !== movieTV.id)
              : watchlist.movies,
          tvs:
            movieTV.type === "tv"
              ? watchlist.tvs.filter((e) => e.id !== movieTV.id)
              : watchlist.tvs,
        });
      }

      return res.status;
    }
    return false;
  };

  const inWatchlist = (movieTV: movieT | TVT) => {
    if (auth.user.status === "user" && watchlist.status === "user") {
      if (movieTV.type === "movie") {
        return watchlist.movies.filter((e) => e.id === movieTV.id).length > 0;
      }
      if (movieTV.type === "tv") {
        return watchlist.tvs.filter((e) => e.id === movieTV.id).length > 0;
      }
    }
    return false;
  };

  return {
    data: watchlist,
    addToWatchlist,
    removeFromWatchlist,
    inWatchlist,
  };
}

export { WatchlistProvider, useWatchlist };
