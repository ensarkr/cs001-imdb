import { useRef, useState } from "react";
import { pageFetchDouble } from "../typings/global";

/* 
Wrapper for fetching datas that are arrays

It can fetch next page via fetchNextPage
Its can append data or reset

Returns multiple information and data for other components to use
*/

export default function useFetchPages<T extends unknown[]>(
  fetchOperation: (fetchPage: number) => pageFetchDouble<{ data: T }>,
  append: boolean,
  appendPlace: "start" | "end" = "end"
) {
  const [status, setStatus] = useState<
    "loading" | "fetchable" | "finished" | "error"
  >("fetchable");

  const [data, setData] = useState<T | []>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const didFetchStartRef = useRef<boolean>(false);
  const currentPageRef = useRef(0);

  const fetchNextPage = async () => {
    setStatus("loading");
    didFetchStartRef.current = true;

    const res = await fetchOperation(++currentPageRef.current);

    if (!res.status) {
      setStatus("error");
      setErrorMessage(res.message);
      return;
    }

    if (append) {
      if (appendPlace === "start")
        setData(
          data === undefined
            ? res.value.data
            : ([...res.value.data, ...data] as T)
        );
      if (appendPlace === "end")
        setData(
          data === undefined
            ? res.value.data
            : ([...data, ...res.value.data] as T)
        );
    } else setData(res.value.data);

    if (res.value.maxPage <= currentPageRef.current) {
      setStatus("finished");
      return;
    }

    setStatus("fetchable");
  };

  const fetchReset = async () => {
    currentPageRef.current = 0;
    setData([]);
    fetchNextPage();
  };

  return {
    data,
    setData,
    fetchReset,
    fetchStatus: status,
    fetchNextPage,
    didFetchStartRef,
    fetchErrorMessage:
      errorMessage.length > 0 ? errorMessage : "error occurred!",
  };
}
