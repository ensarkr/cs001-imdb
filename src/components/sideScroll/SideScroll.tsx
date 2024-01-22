import { ReactNode, memo, useEffect, useRef } from "react";
import styles from "./sideScroll.module.css";
import HeaderTitle, { headerTitleProps } from "../headerTitle/HeaderTitle";
import { pageFetchDouble } from "../../typings/global";
import MovieTVCard from "../movieTV/movieTVCard/MovieTVCard";
import { useWatchlist } from "../../context/WatchListContext";
import DotLoader from "../dotLoader/dotLoader";
import useFetchPages from "../../hooks/useFetchPages";
import WatchlistInformation from "../watchlistInformation/WatchlistInformation";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";
import useSideScroll from "../../hooks/useSideScroll";

/*
Renders side scroll div with buttons  

Starts fetching when its in viewport
Fetched datas rendered using renderItem prop

Comes with header component
*/

export default function SideScroll<T>({
  headerTitleProps,
  fetchOperation,
  viewerHeight,
  renderItem,
}: {
  headerTitleProps: headerTitleProps;
  fetchOperation: (fetchPage: number) => pageFetchDouble<{ data: T[] }>;
  viewerHeight: string;
  renderItem: (item: T) => ReactNode;
}) {
  const {
    data,
    fetchErrorMessage,
    fetchNextPage,
    fetchStatus,
    didFetchStartRef,
    fetchReset,
  } = useFetchPages(fetchOperation, false);

  const { listRef, scrollTo, containerRef } = useSideScroll(
    didFetchStartRef.current
  );

  useEffect(() => {
    const mainRect = containerRef.current.getBoundingClientRect();

    const scrollFunction = () => {
      if (
        window.scrollY + window.innerHeight > mainRect.top &&
        didFetchStartRef.current === false
      ) {
        fetchNextPage();
      }
    };

    scrollFunction();
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <div
      className={[
        styles.main,
        headerTitleProps.color === "black" ? styles.whiteBackground : {},
      ].join(" ")}
    >
      <HeaderTitle {...headerTitleProps}></HeaderTitle>
      {data.length > 0 && (
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
        ref={containerRef}
        className={styles.viewer}
        style={{ height: viewerHeight }}
      >
        {fetchStatus === "loading" ? (
          <DotLoader color={headerTitleProps.color}></DotLoader>
        ) : fetchStatus === "error" ? (
          <div onClick={fetchReset} className={styles.center}>
            <p>{fetchErrorMessage}</p>
            <button className={styles.retry}>click to retry</button>
          </div>
        ) : (
          <>
            <div className={styles.list} ref={listRef}>
              {data.map(renderItem)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/*
Renders side scroll div with buttons 

There is no fetching 

Comes with header component
*/

export function SideScrollWithNoFetch({
  headerTitleProps,
  viewerHeight,
  children,
}: {
  headerTitleProps?: headerTitleProps;
  viewerHeight: string;
  children?: ReactNode;
}) {
  const { listRef, scrollTo, containerRef } = useSideScroll(true);

  const currentStartRef = useRef<number>(0);
  const noItem =
    (Array.isArray(children) && children.length === 0) ||
    children === undefined;

  useEffect(() => {
    if (noItem) return;

    const resizeFunction = () => {
      containerRef.current.style.scrollBehavior = "auto";
      containerRef.current.scrollLeft =
        listRef.current.children[
          currentStartRef.current
        ].getBoundingClientRect().left -
        listRef.current.getBoundingClientRect().left;
      containerRef.current.style.scrollBehavior = "smooth";
    };

    window.addEventListener("resize", resizeFunction);

    return () => {
      window.removeEventListener("resize", resizeFunction);
    };
  }, []);

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
        ref={containerRef}
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

const MovieTVCard_MEMO = memo(MovieTVCard);

/*
Renders side scroll div with buttons 

Renders watchlist movies or information about watchlist

Comes with header component
*/

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
        <HeaderTitle title="From your Watchlist" href="/whatToWatch/fromYourWatchlist"></HeaderTitle>
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

/*
Renders side scroll div with buttons 

Renders recently viewed movies 
If there is no recently movie renders nothing
*/

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
