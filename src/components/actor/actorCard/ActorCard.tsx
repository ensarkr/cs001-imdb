import { Link } from "react-router-dom";
import { actorT } from "../../../typings/actor";
import styles from "./actorCard.module.css";

export default function ActorCard({
  data,
  color = "white",
  character,
}: {
  data: actorT;
  color?: "black" | "white";
  character?: string;
}) {
  return (
    <Link to={`/${data.id}/credits`} className={styles.main}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.avatarPath}`}
      ></img>
      <div className={styles.titles}>
        <p className={styles.name} style={{ color: color }}>
          {data.name}
        </p>

        <p className={styles.character}>
          {character !== undefined ? character : ""}
        </p>
      </div>
    </Link>
  );
}
