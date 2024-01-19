import { useEffect } from "react";
import {
  requestSessionID,
  requestNewRequestToken,
  requestUserDetailsViaSessionID,
} from "../../../functions/requests";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    handleQuery();
  }, []);

  const handleQuery = async () => {
    if (params.get("approved") === "true" && params.has("request_token")) {
      const res = await requestSessionID(params.get("request_token") as string);

      if (res.status) {
        const user = await requestUserDetailsViaSessionID(res.value.sessionID);

        if (user.status) {
          auth.updateAuth(user.value, res.value.sessionID);
          navigate("/");
        }
      }
    }
  };

  const handleClick = async () => {
    auth.signOut();
    const token = await requestNewRequestToken();

    if (!token.status) return;

    window.location.href = `https://www.themoviedb.org/authenticate/${token.value.requestToken}?redirect_to=http://localhost:5173/auth/signIn`;
  };

  return (
    <div>
      <button onClick={handleClick}>sign in via tmdb</button>
    </div>
  );
}
