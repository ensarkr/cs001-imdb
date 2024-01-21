import { useEffect, useState } from "react";
import {
  requestSessionID,
  requestNewRequestToken,
  requestUserDetailsViaSessionID,
} from "../../functions/requests";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./signIn.module.css";
import CircleLoader from "../../components/circleLoader/CircleLoader";

export default function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    handleQuery();
  }, []);

  const handleQuery = async () => {
    if (params.get("approved") === "true" && params.has("request_token")) {
      setIsLoading(true);
      const res = await requestSessionID(params.get("request_token") as string);

      if (res.status) {
        const user = await requestUserDetailsViaSessionID(res.value.sessionID);

        if (user.status) {
          auth.updateAuth(user.value, res.value.sessionID);
          navigate("/");
        }
      }
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (isLoading) return;

    auth.signOut();
    const token = await requestNewRequestToken();

    if (!token.status) return;

    window.location.href = `https://www.themoviedb.org/authenticate/${
      token.value.requestToken
    }?redirect_to=${import.meta.env.VITE_SITE_URL + "signin"}`;
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div className={styles.signin}>
            <h1>Sign In</h1>
            <button onClick={handleClick} className={styles.signinButton}>
              {isLoading ? (
                <CircleLoader color="black" height="60%"></CircleLoader>
              ) : (
                "Sign In via TMDB"
              )}
            </button>
          </div>
          <div className={styles.features}>
            <h1> Benefits of your free IMDb account</h1>
            <h3>Personalized Recommendations</h3>
            <p>Discover shows you'll love.</p>
            <h3>Your Watchlist</h3>
            <p>
              Track everything you want to watch and receive e-mail when movies
              open in theaters.
            </p>
            <h3>Your Ratings</h3>
            <p>Rate and remember everything you've seen.</p>
            <h3>Contribute to IMDb</h3>
            <p>
              Add data that will be seen by millions of people and get cool
              badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
