import { useRef, useState } from "react";
import { pageFetchDouble } from "../typings/global";

export default function useFetchPages(
  fetchOperation: (fetchPage: number) => pageFetchDouble<undefined>
) {
  const [status, setStatus] = useState<
    "loading" | "fetchable" | "finished" | "error"
  >("fetchable");
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

    if (res.value.maxPage <= currentPageRef.current) {
      setStatus("finished");
      return;
    }

    setStatus("fetchable");
  };

  const fetchReset = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setState: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    currentPageRef.current = 0;
    setState([]);
    fetchNextPage();
  };

  return {
    fetchReset,
    fetchStatus: status,
    fetchNextPage,
    didFetchStartRef,
    fetchErrorMessage:
      errorMessage.length > 0 ? errorMessage : "error occurred!",
  };
}
