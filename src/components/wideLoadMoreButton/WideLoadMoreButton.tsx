import useFetchPages from "../../hooks/useFetchPages";
import CircleLoader from "../circleLoader/CircleLoader";
import styles from "./wideLoadMoreButton.module.css";

export default function WideLoadMoreButton({
  fetchStatus,
  fetchNextPage,
}: Pick<ReturnType<typeof useFetchPages>, "fetchNextPage" | "fetchStatus">) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (fetchStatus === "fetchable") fetchNextPage();
      }}
    >
      {fetchStatus === "loading" ? (
        <CircleLoader color="blue" height="60%"></CircleLoader>
      ) : (
        <span className={styles.text}>Load more</span>
      )}
    </button>
  );
}
