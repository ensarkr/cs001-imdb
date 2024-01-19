import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./sideScroll.module.css";
import HeaderTitle, { headerTitleProps } from "../headerTitle/HeaderTitle";
import { doubleReturn } from "../../typings/global";
import { movieT } from "../../typings/movie";
import { TVT } from "../../typings/tv";
import MovieTVCard from "../movieTV/movieTVCard/MovieTVCard";
import { actorT } from "../../typings/actor";
import ActorCard from "../actor/actorCard/ActorCard";

export default function SideScroll({
  headerTitleProps,
  fetchOperation,
  showButtons,
  viewerHeight,
  children,
}: {
  headerTitleProps: headerTitleProps;
  fetchOperation: () => Promise<boolean>;
  showButtons: boolean;
  viewerHeight: string;
  children?: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const didFetchStartRef = useRef<boolean>(false);
  const [showError, setShowError] = useState(true);
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
        startFetching();
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

  const startFetching = async () => {
    setIsLoading(true);
    setShowError(false);
    didFetchStartRef.current = true;
    const res = await fetchOperation();

    if (!res) {
      setShowError(true);
    }

    setIsLoading(false);
  };

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
    <div className={styles.main}>
      <HeaderTitle {...headerTitleProps}></HeaderTitle>
      {showButtons && (
        <>
          <button
            className={styles.leftButton}
            style={{
              bottom: `calc((var(--content-inner-left-padding) + ${viewerHeight}) / 2)`,
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
              bottom: `calc((var(--content-inner-left-padding) + ${viewerHeight}) / 2)`,
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
        {isLoading ? (
          <div className={styles.loader}>
            <div className={styles.progress} />
          </div>
        ) : showError ? (
          <div onClick={fetchOperation} className={styles.loader}>
            <p>error occurred</p>
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

export function MovieTVSideScroll({
  headerTitleProps,
  fetchFunction,
}: {
  headerTitleProps: headerTitleProps;
  fetchFunction: (page?: number) => Promise<doubleReturn<movieT[] | TVT[]>>;
}) {
  const [movieTVs, setMovieTVs] = useState<movieT[] | TVT[]>([]);

  const fetchOperation = async () => {
    setMovieTVs([]);
    const res = await fetchFunction();

    if (res.status) {
      setMovieTVs(res.value);
      return true;
    } else {
      return false;
    }
  };

  return (
    <SideScroll
      headerTitleProps={headerTitleProps}
      showButtons={movieTVs.length > 0}
      fetchOperation={fetchOperation}
      viewerHeight="calc((var(--card-width) * 3 / 2) + 167.96px)"
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
  fetchFunction: (page?: number) => Promise<doubleReturn<actorT[]>>;
}) {
  const [actors, setActors] = useState<actorT[]>([]);

  const fetchOperation = async () => {
    setActors([]);
    const res = await fetchFunction();

    if (res.status) {
      setActors(res.value);
      return true;
    } else {
      return false;
    }
  };

  return (
    <SideScroll
      headerTitleProps={headerTitleProps}
      showButtons={actors.length > 0}
      fetchOperation={fetchOperation}
      viewerHeight="calc(var(--card-width) + 16px + 32px + 3.2px)"
    >
      {actors.map((e) => (
        <ActorCard key={e.id} data={e}></ActorCard>
      ))}
    </SideScroll>
  );
}
