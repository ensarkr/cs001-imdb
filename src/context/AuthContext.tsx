import { createContext, useContext, useEffect, useState } from "react";
import { userT } from "../typings/user";
import {
  requestDeleteSessionID,
  requestUserDetailsViaSessionID,
} from "../functions/requests";
import { useRecentlyViewed } from "./RecentlyViewedContext";

type authT =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "user"; data: userT };

const AuthContext = createContext<authT>({ status: "loading" });
const SetAuthContext = createContext<React.Dispatch<
  React.SetStateAction<authT>
> | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<authT>({ status: "loading" });

  useEffect(() => {
    initialUserValidation();
  }, []);

  const initialUserValidation = async () => {
    const sessionID = localStorage.getItem("tmdb_session_id");

    if (sessionID === null) {
      setAuth({ status: "guest" });
      return;
    }

    const userData = await requestUserDetailsViaSessionID(sessionID);

    if (!userData.status) {
      setAuth({ status: "guest" });
      return;
    }

    setAuth({ status: "user", data: userData.value });
  };

  return (
    <SetAuthContext.Provider value={setAuth}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </SetAuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(SetAuthContext);
  const recentlyViewed = useRecentlyViewed();

  if (setAuth === null) {
    throw "setAuth is unaccessible";
  }

  const updateAuth = (user: userT, sessionID: string) => {
    localStorage.setItem("tmdb_session_id", sessionID);
    setAuth({ status: "user", data: user });
  };

  const signOut = () => {
    const sessionID = localStorage.getItem("tmdb_session_id");
    recentlyViewed.clearRecentlyViewed();

    if (sessionID !== null) {
      requestDeleteSessionID(sessionID);
      localStorage.removeItem("tmdb_session_id");
    }
    setAuth({ status: "guest" });
  };

  return {
    user: auth,
    updateAuth,
    signOut,
  };
}

export { AuthProvider, useAuth };
