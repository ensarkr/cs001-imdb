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
import { requestAllFavorites, requestToFavorites } from "../functions/requests";
import { useNavigate } from "react-router-dom";

type favoritesT =
  | { status: "loading" }
  | { status: "guest" }
  | {
      status: "user";
      tvs: TVT[];
      movies: movieT[];
    };

const FavoritesContext = createContext<favoritesT>({ status: "loading" });
const SetFavoritesContext = createContext<React.Dispatch<
  React.SetStateAction<favoritesT>
> | null>(null);

function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<favoritesT>({
    status: "loading",
  });

  const auth = useAuth();

  useEffect(() => {
    if (auth.user.status === "user") {
      fetchAndSetFavorites(auth.user.data.accountID);
    }

    if (auth.user.status === "guest") {
      setFavorites({ status: "guest" });
    }
  }, [auth.user.status]);

  const fetchAndSetFavorites = async (accountID: number) => {
    const res = await requestAllFavorites(accountID);

    if (res.status) {
      setFavorites({ status: "user", ...res.value });
    }
  };

  console.log("favorites", favorites);

  return (
    <>
      <SetFavoritesContext.Provider value={setFavorites}>
        <FavoritesContext.Provider value={favorites}>
          {children}
        </FavoritesContext.Provider>
      </SetFavoritesContext.Provider>
    </>
  );
}

function useFavorites() {
  const favorites = useContext(FavoritesContext);
  const setFavorites = useContext(SetFavoritesContext);
  const navigate = useNavigate();

  const auth = useAuth();

  if (setFavorites === null) throw "setFavorites unaccessible";

  const addToFavorites = async (movieTV: movieT | TVT) => {
    if (auth.user.status === "loading") return false;

    if (auth.user.status === "guest") {
      navigate("/auth/signin");
      return;
    }

    if (auth.user.status === "user" && favorites.status === "user") {
      const res = await requestToFavorites(
        auth.user.data.accountID,
        movieTV.type,
        movieTV.id,
        true
      );

      if (res.status) {
        setFavorites({
          status: "user",
          movies:
            movieTV.type === "movie"
              ? [movieTV, ...favorites.movies]
              : favorites.movies,
          tvs:
            movieTV.type === "tv" ? [movieTV, ...favorites.tvs] : favorites.tvs,
        });
      }

      return res.status;
    }

    return false;
  };

  const removeFromFavorites = async (movieTV: movieT | TVT) => {
    if (auth.user.status === "loading") return false;

    if (auth.user.status === "guest") {
      navigate("/auth/signin");
    }

    if (auth.user.status === "user" && favorites.status === "user") {
      const res = await requestToFavorites(
        auth.user.data.accountID,
        movieTV.type,
        movieTV.id,
        false
      );

      if (res.status) {
        setFavorites({
          status: "user",
          movies:
            movieTV.type === "movie"
              ? favorites.movies.filter((e) => e.id !== movieTV.id)
              : favorites.movies,
          tvs:
            movieTV.type === "tv"
              ? favorites.tvs.filter((e) => e.id !== movieTV.id)
              : favorites.tvs,
        });
      }

      return res.status;
    }
    return false;
  };

  const isFavorite = (movieTV: movieT | TVT) => {
    if (auth.user.status === "user" && favorites.status === "user") {
      if (movieTV.type === "movie") {
        return favorites.movies.filter((e) => e.id === movieTV.id).length > 0;
      }
      if (movieTV.type === "tv") {
        return favorites.tvs.filter((e) => e.id === movieTV.id).length > 0;
      }
    }
    return false;
  };

  return {
    data: favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}

export { FavoritesProvider, useFavorites };
