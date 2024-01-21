import { Link, useRouteError } from "react-router-dom";
import styles from "./errorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h2>
          Error occurred.
          <Link to={"/"}>Go to the homepage »</Link>
        </h2>
        <code className={styles.error}>{JSON.stringify(error, null, 4)}</code>
      </div>
    </main>
  );
}
