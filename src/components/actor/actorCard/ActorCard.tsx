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
    <Link className={styles.main} to={"/"}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.avatarPath}`}
      ></img>
      <p className={styles.name} style={{ color: color }}>
        {data.name}
      </p>
      {character !== undefined ? (
        <p className={styles.character}>{character}</p>
      ) : (
        <></>
      )}
    </Link>
  );
}
