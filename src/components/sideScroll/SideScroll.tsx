import { ReactNode, memo, useEffect, useRef, useState } from "react";
import styles from "./sideScroll.module.css";
import HeaderTitle, { headerTitleProps } from "../headerTitle/HeaderTitle";
import { doubleReturn, pageFetchDouble } from "../../typings/global";
import { movieT } from "../../typings/movie";
import { TVT } from "../../typings/tv";
import MovieTVCard from "../movieTV/movieTVCard/MovieTVCard";
import { actorT } from "../../typings/actor";
import ActorCard from "../actor/actorCard/ActorCard";
import { useWatchlist } from "../../context/WatchListContext";
import DotLoader from "../dotLoader/dotLoader";
import useFetchPages from "../../hooks/useFetchPages";
import WatchlistInformation from "../watchlistInformation/WatchlistInformation";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

export default function SideScroll({
  headerTitleProps,
  fetchOperation,
  showButtons,
  viewerHeight,
  children,
}: {
  headerTitleProps: headerTitleProps;
  fetchOperation: () => Promise<doubleReturn<{ maxPage: number }>>;
  showButtons: boolean;
  viewerHeight: string;
  children?: ReactNode;
}) {
  const { fetchErrorMessage, fetchNextPage, fetchStatus, didFetchStartRef } =
    useFetchPages(fetchOperation);

  const mainRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const currentStartRef = useRef<number>(0);

  useEffect(() => {
    const mainRect = mainRef.current.getBoundingClientRect();

    const scrollFunction = () => {
      if (
        window.scrollY + window.innerHeight > mainRect.top &&
        didFetchStartRef.current === false
      ) {
        fetchNextPage();
      }
    };

    const resizeFunction = () => {
      if (didFetchStartRef.current === false) return;

      mainRef.current.style.scrollBehavior = "auto";
      mainRef.current.scrollLeft =
        listRef.current.children[
          currentStartRef.current
        ].getBoundingClientRect().left -
        listRef.current.getBoundingClientRect().left;
      mainRef.current.style.scrollBehavior = "smooth";
    };

    scrollFunction();
    window.addEventListener("scroll", scrollFunction);
    window.addEventListener("resize", resizeFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  const scrollTo = async (direction: "left" | "right") => {
    const parentRect = mainRef.current.getBoundingClientRect();
    const rect = listRef.current.getBoundingClientRect();

    if (direction === "right") {
      for (let i = 0; i < listRef.current.children.length; i++) {
        if (
          parentRect.width + parentRect.left <
          listRef.current.children[i].getBoundingClientRect().left +
            listRef.current.children[i].getBoundingClientRect().width -
            1
        ) {
          currentStartRef.current = i;

          mainRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;

          return;
        }
      }
    }

    if (direction === "left") {
      for (let i = listRef.current.children.length - 1; i >= 0; i--) {
        if (
          listRef.current.children[i].getBoundingClientRect().left <
          parentRect.left -
            parentRect.width +
            listRef.current.children[i].getBoundingClientRect().width
        ) {
          currentStartRef.current = i;
          mainRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;
          return;
        }
      }

      currentStartRef.current = 0;
      mainRef.current.scrollLeft =
        listRef.current.children[0].getBoundingClientRect().left - rect.left;
      return;
    }
  };

  return (
    <div
      className={[
        styles.main,
        headerTitleProps.color === "black" ? styles.whiteBackground : {},
      ].join(" ")}
    >
      <HeaderTitle {...headerTitleProps}></HeaderTitle>
      {showButtons && (
        <>
          <button
            className={styles.leftButton}
            style={{
              bottom: `calc((var(--content-left-padding) + ${viewerHeight}) / 2)`,
            }}
            onClick={() => scrollTo("left")}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
            </svg>
          </button>
          <button
            className={styles.rightButton}
            style={{
              bottom: `calc((var(--content-left-padding) + ${viewerHeight}) / 2)`,
            }}
            onClick={() => scrollTo("right")}
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
            </svg>
          </button>
        </>
      )}
      <div
        ref={mainRef}
        className={styles.viewer}
        style={{ height: viewerHeight }}
      >
        {fetchStatus === "loading" ? (
          <DotLoader color={headerTitleProps.color}></DotLoader>
        ) : fetchStatus === "error" ? (
          <div onClick={fetchOperation} className={styles.center}>
            <p>{fetchErrorMessage}</p>
            <button className={styles.retry}>click to retry</button>
          </div>
        ) : (
          <>
            <div className={styles.list} ref={listRef}>
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function SideScrollWithNoFetch({
  headerTitleProps,
  viewerHeight,
  children,
}: {
  headerTitleProps?: headerTitleProps;
  viewerHeight: string;
  children?: ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const currentStartRef = useRef<number>(0);
  const noItem =
    (Array.isArray(children) && children.length === 0) ||
    children === undefined;

  useEffect(() => {
    if (noItem) return;

    const resizeFunction = () => {
      mainRef.current.style.scrollBehavior = "auto";
      mainRef.current.scrollLeft =
        listRef.current.children[
          currentStartRef.current
        ].getBoundingClientRect().left -
        listRef.current.getBoundingClientRect().left;
      mainRef.current.style.scrollBehavior = "smooth";
    };

    window.addEventListener("resize", resizeFunction);

    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

  const scrollTo = async (direction: "left" | "right") => {
    const parentRect = mainRef.current.getBoundingClientRect();
    const rect = listRef.current.getBoundingClientRect();

    if (direction === "right") {
      for (let i = 0; i < listRef.current.children.length; i++) {
        if (
          parentRect.width + parentRect.left <
          listRef.current.children[i].getBoundingClientRect().left +
            listRef.current.children[i].getBoundingClientRect().width -
            1
        ) {
          currentStartRef.current = i;

          mainRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;

          return;
        }
      }
    }

    if (direction === "left") {
      for (let i = listRef.current.children.length - 1; i >= 0; i--) {
        if (
          listRef.current.children[i].getBoundingClientRect().left <
          parentRect.left -
            parentRect.width +
            listRef.current.children[i].getBoundingClientRect().width
        ) {
          currentStartRef.current = i;
          mainRef.current.scrollLeft =
            listRef.current.children[i].getBoundingClientRect().left -
            rect.left;
          return;
        }
      }

      currentStartRef.current = 0;
      mainRef.current.scrollLeft =
        listRef.current.children[0].getBoundingClientRect().left - rect.left;
      return;
    }
  };

  if (noItem) return <></>;

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
      <button
        className={styles.leftButton}
        style={{
          bottom: `calc((var(--content-left-padding) + ${viewerHeight}) / 2)`,
        }}
        onClick={() => scrollTo("left")}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="presentation"
        >
          <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
        </svg>
      </button>
      <button
        className={styles.rightButton}
        style={{
          bottom: `calc((var(--content-left-padding) + ${viewerHeight}) / 2)`,
        }}
        onClick={() => scrollTo("right")}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="presentation"
        >
          <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
        </svg>
      </button>
      <div
        ref={mainRef}
        className={styles.viewer}
        style={{ height: viewerHeight }}
      >
        <div className={styles.list} ref={listRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function MovieTVSideScroll({
  headerTitleProps,
  fetchFunction,
}: {
  headerTitleProps: headerTitleProps;
  fetchFunction: (page?: number) => pageFetchDouble<{ data: movieT[] | TVT[] }>;
}) {
  const [movieTVs, setMovieTVs] = useState<movieT[] | TVT[]>([]);

  const fetchOperation = async () => {
    setMovieTVs([]);
    const res = await fetchFunction();

    if (res.status) {
      setMovieTVs(res.value.data);
    }

    return res;
  };

  return (
    <SideScroll
      headerTitleProps={headerTitleProps}
      showButtons={movieTVs.length > 0}
      fetchOperation={fetchOperation}
      viewerHeight="var(--movieTV-card-height)"
    >
      {movieTVs.map((e) => (
        <MovieTVCard key={e.id} data={e}></MovieTVCard>
      ))}
    </SideScroll>
  );
}

export function ActorSideScroll({
  headerTitleProps,
  fetchFunction,
}: {
  headerTitleProps: headerTitleProps;
  fetchFunction: (page?: number) => pageFetchDouble<{ data: actorT[] }>;
}) {
  const [actors, setActors] = useState<actorT[]>([]);

  const fetchOperation = async () => {
    setActors([]);
    const res = await fetchFunction();

    if (res.status) {
      setActors(res.value.data);
    }

    return res;
  };

  return (
    <SideScroll
      headerTitleProps={headerTitleProps}
      showButtons={actors.length > 0}
      fetchOperation={fetchOperation}
      viewerHeight="var(--actor-card-height)"
    >
      {actors.map((e) => (
        <ActorCard key={e.id} data={e}></ActorCard>
      ))}
    </SideScroll>
  );
}

const MovieTVCard_MEMO = memo(MovieTVCard);

export function FromYourWatchlistSideScroll() {
  const watchlist = useWatchlist();

  if (
    watchlist.data.status === "user" &&
    watchlist.data.movies.length + watchlist.data.movies.length > 0
  ) {
    return (
      <SideScrollWithNoFetch
        headerTitleProps={{ title: "From your Watchlist", href: "/" }}
        viewerHeight="var(--movieTV-card-height)"
      >
        {[
          ...watchlist.data.movies.slice(0, 10),
          ...watchlist.data.tvs.slice(0, 10),
        ].map((e) => (
          <MovieTVCard_MEMO key={e.id} data={e}></MovieTVCard_MEMO>
        ))}
      </SideScrollWithNoFetch>
    );
  } else
    return (
      <div className={styles.main}>
        <HeaderTitle title="From your Watchlist" href="/"></HeaderTitle>
        <div
          className={[styles.viewer, styles.center].join(" ")}
          style={{ height: "var(--movieTV-card-height)" }}
        >
          <WatchlistInformation
            color="white"
            status={watchlist.data.status}
            height="100%"
          ></WatchlistInformation>
        </div>
      </div>
    );
}

export function RecentlyViewedSideScroll() {
  const recentlyViewed = useRecentlyViewed();

  if (
    recentlyViewed.data.status === "loaded" &&
    recentlyViewed.data.movieTvs.length + recentlyViewed.data.movieTvs.length >
      0
  ) {
    return (
      <div className={styles.recentlyViewed}>
        <div className={styles.recentlyTop}>
          <h2>Recently viewed</h2>
          <button
            className={styles.clear}
            onClick={recentlyViewed.clearRecentlyViewed}
          >
            Clear all
          </button>
        </div>
        <SideScrollWithNoFetch viewerHeight="var(--movieTV-card-height)">
          {recentlyViewed.data.movieTvs.map((e) => (
            <MovieTVCard_MEMO key={e.id} data={e}></MovieTVCard_MEMO>
          ))}
        </SideScrollWithNoFetch>
      </div>
    );
  } else return <></>;
}
