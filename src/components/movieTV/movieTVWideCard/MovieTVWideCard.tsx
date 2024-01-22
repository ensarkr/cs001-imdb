import { Link } from "react-router-dom";
import { movieT } from "../../../typings/movie";
import { TVT } from "../../../typings/tv";
import styles from "./movieTVWideCard.module.css";

/*
Renders wide movie/tv card

Main difference between this and default is this is has width at 100%
Also it has no button

By clicking user can navigate to movie/tv detail page
*/

export default function MovieTVWideCard({ data }: { data: movieT | TVT }) {
  return (
    <Link
      to={`/${data.type}/${data.id}/detail`}
      className={[styles.main].join(" ")}
    >
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}
      ></img>

      <div className={styles.content}>
        <h4>{data.title}</h4>
        <p>{data.releaseDate}</p>
      </div>
    </Link>
  );
}
