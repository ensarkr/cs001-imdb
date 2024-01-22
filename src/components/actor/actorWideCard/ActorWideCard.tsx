import styles from "./ActorWideCard.module.css";
import { actorT } from "../../../typings/actor";
import { Link } from "react-router-dom";

/*
Renders actor image ant its name
If character exist it also renders character at bottom
By clicking user can navigate to actor credits
Main difference between this and default is this is has width at 100%
*/

export default function ActorWideCard({ data }: { data: actorT }) {
  return (
    <Link to={`/${data.id}/credits`} className={styles.main}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.avatarPath}`}
      ></img>

      <div className={styles.content}>
        <h4>{data.name}</h4>
        <p>{data.department}</p>
      </div>
    </Link>
  );
}
