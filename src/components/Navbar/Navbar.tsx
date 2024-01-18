import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const auth = useAuth();

  return (
    <>
      <code>{JSON.stringify(auth.user, null, 4)}</code>
      {auth.user.status === "user" && (
        <button onClick={auth.signOut}>sign out</button>
      )}
    </>
  );
}
