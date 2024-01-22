import { ReactNode, useEffect } from "react";
import HeaderTitle, { headerTitleProps } from "../headerTitle/HeaderTitle";
import styles from "./wideLIst.module.css";
import { pageFetchDouble } from "../../typings/global";
import CircleLoader from "../circleLoader/CircleLoader";
import useFetchPages from "../../hooks/useFetchPages";
import useFetchSingle from "../../hooks/useFetchSingle";

/*
Renders list with load more button

Starts fetching on component mount 
Fetched datas rendered using renderItem prop

Comes with header component
*/

export default function WideList<T>({
  headerTitleProps,
  fetchOperation,
  renderItem,
}: {
  headerTitleProps: headerTitleProps;
  fetchOperation: (fetchPage: number) => pageFetchDouble<{ data: T[] }>;
  renderItem: (item: T) => ReactNode;
}) {
  const { data, fetchNextPage, fetchStatus, fetchErrorMessage, fetchReset } =
    useFetchPages(fetchOperation, true, "end");

  useEffect(() => {
    fetchNextPage();
  }, []);

  const noItemFound = data.length === 0 && fetchStatus === "finished";

  return (
    <div
      className={[
        styles.main,
        headerTitleProps.color === "black" ? styles.whiteBackground : {},
      ].join(" ")}
    >
      <HeaderTitle {...headerTitleProps}></HeaderTitle>

      <div className={styles.viewer}>
        {data && data.map(renderItem)}
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
                <button onClick={fetchReset} className={styles.moreButton}>
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

/*
Renders list 

It is only used for container style
*/

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

/*
Renders list 

Instead of fetching by itself
It takes fetched data as prop

So fetching data is made by parent component
*/

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
