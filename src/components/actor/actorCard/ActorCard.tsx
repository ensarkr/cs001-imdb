import { Link } from "react-router-dom";
import { actorT } from "../../../typings/actor";
import styles from "./actorCard.module.css";

export default function ActorCard({ data }: { data: actorT }) {
  return (
    <Link className={styles.main} to={"/"}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.avatarPath}`}
      ></img>
      <p className={styles.name}>{data.name}</p>
    </Link>
  );
}
