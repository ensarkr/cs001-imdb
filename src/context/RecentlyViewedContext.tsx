import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TVT } from "../typings/tv";
import { movieT } from "../typings/movie";

type recentlyViewedItemT = (movieT | TVT) & { insertedAt: number };

type recentlyViewedT =
  | { status: "loading" }
  | {
      status: "loaded";
      movieTvs: recentlyViewedItemT[];
    };

const RecentlyViewedContext = createContext<recentlyViewedT>({
  status: "loading",
});
const SetRecentlyViewedContext = createContext<React.Dispatch<
  React.SetStateAction<recentlyViewedT>
> | null>(null);

/*
Provider loads all recently viewed movies/tvs on mount from localStorage
*/

function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<recentlyViewedT>({
    status: "loading",
  });

  useEffect(() => {
    setRecentlyViewed({
      status: "loaded",
      movieTvs: getItemsFromLocalStorage(),
    });
  }, []);

  const getItemsFromLocalStorage = () => {
    const items = localStorage.getItem("recentlyViewed");

    if (items === null) {
      localStorage.setItem("recentlyViewed", JSON.stringify([]));
      return [] as recentlyViewedItemT[];
    } else {
      return JSON.parse(items) as recentlyViewedItemT[];
    }
  };

  return (
    <>
      <SetRecentlyViewedContext.Provider value={setRecentlyViewed}>
        <RecentlyViewedContext.Provider value={recentlyViewed}>
          {children}
        </RecentlyViewedContext.Provider>
      </SetRecentlyViewedContext.Provider>
    </>
  );
}

/*
Return functions and context

Functions include
- addToRecentlyViewed = add movie/tv to recentlyViewed (storage limit is 20, last ones removed)
- clearRecentlyViewed = clear all movies/tvs from recentlyViewed
*/

function useRecentlyViewed() {
  const recentlyViewed = useContext(RecentlyViewedContext);
  const setRecentlyViewed = useContext(SetRecentlyViewedContext);

  if (setRecentlyViewed === null) throw "setRecentlyViewed unaccessible";

  const addToRecentlyViewed = async (movieTV: movieT | TVT) => {
    if (recentlyViewed.status === "loading") return;

    const newRecentlyViewed = {
      status: "loaded",
      movieTvs: [
        { ...movieTV, insertedAt: Date.now() },
        ...recentlyViewed.movieTvs.filter((e) => e.id !== movieTV.id),
      ].slice(0, 20),
    };

    setRecentlyViewed(newRecentlyViewed as recentlyViewedT);
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(newRecentlyViewed.movieTvs)
    );
  };

  const clearRecentlyViewed = async () => {
    setRecentlyViewed({ status: "loaded", movieTvs: [] });
    localStorage.setItem("recentlyViewed", JSON.stringify([]));
  };

  return {
    data: recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
}

export { RecentlyViewedProvider, useRecentlyViewed };
