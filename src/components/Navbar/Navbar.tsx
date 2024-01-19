import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const auth = useAuth();

  return (
    <>
      {/* <code style={{ color: "white" }}>
        {JSON.stringify(auth.user, null, 4)}
      </code>
      {auth.user.status === "user" && (
        <button onClick={auth.signOut}>sign out</button>
      )}
      {auth.user.status === "guest" && (
        <Link to={"/auth/signIn"}>sign in page</Link>
      )} */}
    </>
  );
}
