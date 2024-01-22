import { useRef, useState } from "react";
import { doubleReturnRequired } from "../typings/global";

/* 
Wrapper for fetching datas that are arrays but has only one page

Returns multiple information and data for other components to use
*/

export default function useFetchSingle<T>(
  fetchOperation: () => Promise<doubleReturnRequired<T>>
) {
  const [data, setData] = useState<T | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const didFetchStartRef = useRef<boolean>(false);
  const [showError, setShowError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const status: "loading" | "error" | "fetched" = isLoading
    ? "loading"
    : showError
    ? "error"
    : "fetched";

  const startFetching = async () => {
    setIsLoading(true);
    setShowError(false);
    setErrorMessage("");
    didFetchStartRef.current = true;
    const res = await fetchOperation();

    if (!res.status) {
      setErrorMessage(res.message);
      setShowError(true);
    } else {
      setData(res.value);
    }

    setIsLoading(false);
  };

  return {
    data,
    setData,
    fetchStatus: status,
    didFetchStartRef,
    startFetching,
    fetchErrorMessage:
      errorMessage.length > 0 ? errorMessage : "error occurred!",
  };
}
