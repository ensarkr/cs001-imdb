import { useParams } from "react-router-dom";
import styles from "./actorCredits.module.css";
import {
  requestActor,
  requestActorMovies,
  requestActorTVs,
} from "../../functions/requests";
import { memo, useEffect, useState } from "react";
import useFetchSingle from "../../hooks/useFetchSingle";
import { WideListWithOptions } from "../../components/wideList/WideList";
import MovieTVWideDetailedCard from "../../components/movieTV/movieTVWideDetailedCard/MovieTVWideDetailedCard";
import { actorT } from "../../typings/actor";

const MovieTVWideDetailedCard_MEMO = memo(MovieTVWideDetailedCard);

export default function ActorCredits() {
  const params = useParams();

  return (
    <InnerActorCredits
      actorId={parseInt(params.actorId as string)}
      key={params.actorId as string}
    ></InnerActorCredits>
  );
}

function InnerActorCredits({ actorId }: { actorId: number }) {
  const [actor, setActor] = useState<actorT | undefined>(undefined);
  const movies = useFetchSingle(() => requestActorMovies(actorId));
  const tvs = useFetchSingle(() => requestActorTVs(actorId));
  const [tab, setTab] = useState<"movie" | "tv">("movie");

  useEffect(() => {
    movies.startFetching();

    const fetchAndSetActor = async () => {
      const res = await requestActor(actorId);
      if (res.status) setActor(res.value);
    };
    fetchAndSetActor();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>{actor && actor.name} </h1>

        <div className={styles.tabs}>
          <button
            className={[
              styles.tab,
              tab === "movie" ? styles.activeTab : "",
            ].join(" ")}
            onClick={() => setTab("movie")}
          >
            MOVIE
          </button>
          <button
            className={[styles.tab, tab === "tv" ? styles.activeTab : ""].join(
              " "
            )}
            onClick={() => {
              if (tvs.didFetchStartRef.current === false) tvs.startFetching();
              setTab("tv");
            }}
          >
            TV
          </button>
        </div>

        <div
          className={[
            styles.tabContent,
            tab === "movie" ? styles.activeTabContent : "",
          ].join(" ")}
        >
          <WideListWithOptions fetchData={movies}>
            {movies.data !== undefined &&
              movies.data.map((e) => (
                <MovieTVWideDetailedCard_MEMO
                  data={e}
                ></MovieTVWideDetailedCard_MEMO>
              ))}
          </WideListWithOptions>
        </div>
        <div
          className={[
            styles.tabContent,
            tab === "tv" ? styles.activeTabContent : "",
          ].join(" ")}
        >
          <WideListWithOptions fetchData={tvs}>
            {tvs.data !== undefined &&
              tvs.data.map((e) => (
                <MovieTVWideDetailedCard_MEMO
                  data={e}
                ></MovieTVWideDetailedCard_MEMO>
              ))}
          </WideListWithOptions>
        </div>
      </div>
    </div>
  );
}
