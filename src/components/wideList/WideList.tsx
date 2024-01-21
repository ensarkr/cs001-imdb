import { ReactNode, memo, useEffect, useState } from "react";
import HeaderTitle, { headerTitleProps } from "../headerTitle/HeaderTitle";
import styles from "./wideLIst.module.css";
import { pageFetchDouble } from "../../typings/global";
import { movieT } from "../../typings/movie";
import { TVT } from "../../typings/tv";
import MovieTVWideCard from "../movieTV/movieTVWideCard/MovieTVWideCard";
import { actorT } from "../../typings/actor";
import ActorWideCard from "../actor/actorWideCard/ActorWideCard";
import CircleLoader from "../circleLoader/CircleLoader";
import useFetchPages from "../../hooks/useFetchPages";
import useFetchSingle from "../../hooks/useFetchSingle";

const MovieTVWideCard_MEMO = memo(MovieTVWideCard);
const ActorWideCard_MEMO = memo(ActorWideCard);

export default function WideList({
  headerTitleProps,
  fetchOperation,
  children,
  setState,
}: {
  headerTitleProps: headerTitleProps;
  fetchOperation: (fetchPage: number) => pageFetchDouble<undefined>;
  children?: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { fetchNextPage, fetchStatus, fetchErrorMessage, fetchReset } =
    useFetchPages(fetchOperation);

  useEffect(() => {
    fetchNextPage();
  }, []);

  const noItemFound =
    ((Array.isArray(children) && children.length === 0) ||
      children === undefined) &&
    fetchStatus === "finished";

  return (
    <div
      className={[
        styles.main,
        headerTitleProps.color === "black" ? styles.whiteBackground : {},
      ].join(" ")}
    >
      <HeaderTitle {...headerTitleProps}></HeaderTitle>

      <div className={styles.viewer}>
        {children}
        {noItemFound ? (
          <p className={styles.error}>No item found</p>
        ) : (
          <div className={styles.bottom}>
            {fetchStatus === "finished" ? (
              <p className={styles.error}>No more item left</p>
            ) : fetchStatus === "loading" ? (
              <div className={styles.moreButton}>
                <CircleLoader
                  height="1rem"
                  color="var(--blue-color)"
                ></CircleLoader>
              </div>
            ) : fetchStatus === "error" ? (
              <>
                <p className={styles.error}>{fetchErrorMessage}</p>
                <button
                  onClick={() => fetchReset(setState)}
                  className={styles.moreButton}
                >
                  click to retry
                </button>
              </>
            ) : (
              <button onClick={fetchNextPage} className={styles.moreButton}>
                Load more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function WideListWithNoFetch({
  headerTitleProps,
  children,
}: {
  headerTitleProps?: headerTitleProps;
  children?: ReactNode;
}) {
  return (
    <div
      className={[
        styles.main,
        headerTitleProps && headerTitleProps.color === "black"
          ? styles.whiteBackground
          : {},
      ].join(" ")}
    >
      {headerTitleProps && <HeaderTitle {...headerTitleProps}></HeaderTitle>}

      <div className={styles.viewer}>{children}</div>
    </div>
  );
}

export function WideListWithOptions({
  fetchData,
  children,
}: {
  fetchData: Pick<
    ReturnType<typeof useFetchSingle>,
    "fetchStatus" | "startFetching" | "fetchErrorMessage"
  >;
  children?: ReactNode;
}) {
  const noItemFound =
    ((Array.isArray(children) && children.length === 0) ||
      children === undefined) &&
    fetchData.fetchStatus === "fetched";

  return (
    <div className={styles.main}>
      <div className={styles.viewer}>
        {noItemFound ? (
          <p className={styles.error}>No item found</p>
        ) : fetchData.fetchStatus === "loading" ? (
          <CircleLoader height="1rem" color="var(--blue-color)"></CircleLoader>
        ) : fetchData.fetchStatus === "error" ? (
          <>
            <div className={styles.bottom}>
              <p className={styles.error}>{fetchData.fetchErrorMessage}</p>
              <button
                onClick={fetchData.startFetching}
                className={styles.moreButton}
              >
                click to retry
              </button>
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export function MovieTVWideList({
  headerTitleProps,
  fetchFunction,
}: {
  headerTitleProps: headerTitleProps;
  fetchFunction: (page: number) => pageFetchDouble<{ data: movieT[] | TVT[] }>;
}) {
  const [moviesTVs, setMovieTVs] = useState<(movieT | TVT)[]>([]);

  const fetchOperation = async (page: number) => {
    const res = await fetchFunction(page);

    if (res.status) {
      setMovieTVs([...moviesTVs, ...res.value.data]);
    }

    return res;
  };

  return (
    <WideList
      headerTitleProps={headerTitleProps}
      fetchOperation={fetchOperation}
      setState={setMovieTVs}
    >
      {moviesTVs.map((e) => (
        <MovieTVWideCard_MEMO key={e.id} data={e}></MovieTVWideCard_MEMO>
      ))}
    </WideList>
  );
}

export function ActorWideList({
  headerTitleProps,
  fetchFunction,
}: {
  headerTitleProps: headerTitleProps;
  fetchFunction: (page: number) => pageFetchDouble<{ data: actorT[] }>;
}) {
  const [actors, setActors] = useState<actorT[]>([]);

  const fetchOperation = async (page: number) => {
    const res = await fetchFunction(page);

    if (res.status) {
      setActors([...actors, ...res.value.data]);
    }
    return res;
  };

  return (
    <WideList
      headerTitleProps={headerTitleProps}
      fetchOperation={fetchOperation}
      setState={setActors}
    >
      {actors.map((e) => (
        <ActorWideCard_MEMO key={e.id} data={e}></ActorWideCard_MEMO>
      ))}
    </WideList>
  );
}
