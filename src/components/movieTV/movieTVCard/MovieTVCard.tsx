import { Link } from "react-router-dom";
import { movieT } from "../../../typings/movie";
import { TVT } from "../../../typings/tv";
import styles from "./movieTVCard.module.css";

export default function MovieTVCard({ data }: { data: movieT | TVT }) {
  return (
    <Link to={"/"} className={styles.main}>
      <img
        className={styles.image}
        src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}
      ></img>

      <div className={styles.content}>
        <div className={styles.vote}>
          <svg
            width="0.8rem"
            height="0.8rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#f5c518"
            role="presentation"
          >
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
          <span>{data.voteAverage.toString().slice(0, 3)}</span>
        </div>

        <div className={styles.title}>{data.title}</div>
        <button className={styles.watchList}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
          </svg>
          Watchlist
        </button>
        <Link to={"/"} className={styles.trailer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="presentation"
          >
            <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"></path>
          </svg>
          Trailer
        </Link>
      </div>
    </Link>
  );
}
