import { MouseEvent, useState } from "react";
import { useFavorites } from "../../../context/FavoritesContext";
import { movieDetailT, movieT } from "../../../typings/movie";
import { TVDetailT, TVT } from "../../../typings/tv";
import styles from "./heroPart.module.css";
import { useWatchlist } from "../../../context/WatchListContext";

export default function HeroPart({ data }: { data: movieDetailT | TVDetailT }) {
  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/w500/${data.posterPath}')`,
      }}
    >
      <div className={styles.opaqueDiv}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titles}>
              <h1>{data.title}</h1>
              <ul>
                <li> {data.releaseDate.split("-")[0]}</li>
                {data.runtime && (
                  <li>
                    {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                  </li>
                )}
              </ul>
            </div>
            <div className={styles.bigStats}>
              <div className={styles.stat}>
                <p>IMDb RATING</p>
                <div className={styles.rating}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                    fill="var(--secondary-color)"
                    role="presentation"
                  >
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  <div>
                    <p className={styles.voteAverage}>
                      <span>{data.voteAverage.toString().slice(0, 3)}</span>
                      /10
                    </p>
                    <p>{data.voteCount}</p>
                  </div>
                </div>
              </div>
              <div className={styles.stat}>
                <p>FAVORITE</p>
                <FavoriteButton data={data}></FavoriteButton>
              </div>
              <div className={styles.stat}>
                <p>POPULARITY</p>
                <div className={styles.popularity}>
                  {Math.floor(data.popularity)}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.media}>
            <MainTrailer data={data}></MainTrailer>
            <div className={styles.extra}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  role="presentation"
                >
                  <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
                </svg>
                {data.videos.length} VIDEOS
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                </svg>
                {data.images.length} PHOTOS
              </div>
            </div>
          </div>
          <div className={styles.summary}>
            <ul className={styles.details}>
              <li>
                {/* <ul className={styles.genres}>
                  {data.genreIds.map((e) => (
                    <li>{e}</li>
                  ))}
                </ul> */}
                {data.overview}
              </li>
              <li className={styles.smallStats}>
                <div className={styles.stat}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="2rem"
                    viewBox="0 0 24 24"
                    fill="var(--secondary-color)"
                    role="presentation"
                  >
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  <div className={styles.voteAverage}>
                    <p>
                      <span>{data.voteAverage.toString().slice(0, 3)}</span> /10{" "}
                      {data.voteCount}
                    </p>
                  </div>
                </div>
                <div className={styles.stat}>
                  <FavoriteButton data={data}></FavoriteButton>
                </div>
                <div className={styles.stat}>{Math.floor(data.popularity)}</div>
              </li>

              <hr className={styles.line}></hr>

              {data.cast.filter((e) => e.department === "Directing").length >
                0 && (
                <>
                  <li>
                    Director{" "}
                    <span>
                      {
                        data.cast.filter((e) => e.department === "Directing")[0]
                          .name
                      }
                    </span>
                  </li>
                  <hr className={styles.line}></hr>
                </>
              )}

              {data.cast.filter((e) => e.department === "Writing").length >
                0 && (
                <>
                  <li>
                    Writers
                    <ul className={styles.innerList}>
                      {data.cast
                        .filter((e) => e.department === "Writing")
                        .map((e) => (
                          <li key={e.id}>{e.name}</li>
                        ))}
                    </ul>
                  </li>
                  <hr className={styles.line}></hr>
                </>
              )}
              {data.cast.filter((e) => e.department === "Acting").length >
                0 && (
                <li>
                  Starts
                  <ul className={styles.innerList}>
                    {data.cast
                      .filter((e) => e.department === "Acting")
                      .slice(0, 3)
                      .map((e) => (
                        <li key={e.id}>{e.name}</li>
                      ))}
                  </ul>
                </li>
              )}
            </ul>
            <div className={styles.actions}>
              <WatchlistButton data={data}></WatchlistButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoriteButton({ data }: { data: movieT | TVT }) {
  const favorites = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.isFavorite(data);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isFavorite) {
      await favorites.removeFromFavorites(data);
    } else {
      await favorites.addToFavorites(data);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.favorite}>
      {favorites.data.status === "loading" || isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleClick} className={styles.favoriteButton}>
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(245, 197, 24, 1)" }}
            >
              <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(255, 255, 255, 1)" }}
            >
              <path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"></path>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

function MainTrailer({ data }: { data: movieDetailT | TVDetailT }) {
  const getCurrentVideoLink = () => {
    const trailers = data.videos.filter((e) =>
      e.name.toLowerCase().includes("trailer")
    );

    if (trailers.length > 0) {
      return `https://www.youtube.com/embed/${trailers[0].key}`;
    } else {
      return `https://www.youtube.com/embed/${data.videos[0].key}`;
    }
  };

  return (
    <div className={styles.trailer}>
      <div className={styles.image}>
        <img src={`https://image.tmdb.org/t/p/w500/${data.posterPath}`}></img>
      </div>
      {data.videos.length > 0 ? (
        <iframe
          height={"100%"}
          width={"100%"}
          src={getCurrentVideoLink()}
        ></iframe>
      ) : (
        <div className={styles.notFound}>Trailer not found</div>
      )}
    </div>
  );
}

function WatchlistButton({ data }: { data: movieT | TVT }) {
  const watchlist = useWatchlist();
  const [isLoading, setIsLoading] = useState(false);

  const inWatchlist = watchlist.inWatchlist(data);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    if (inWatchlist) {
      await watchlist.removeFromWatchlist(data);
    } else {
      await watchlist.addToWatchlist(data);
    }
    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} className={styles.watchList}>
      {watchlist.data.status === "loading" || isLoading ? (
        <div className={[styles.loader, styles.blackLoader].join(" ")}></div>
      ) : (
        <>
          {inWatchlist ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0 .984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4.984.984 0 0 0-1.4 0L9 16.2z"></path>
              </svg>
              <span>In Watchlist</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="presentation"
              >
                <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
              </svg>
              <span>Add to Watchlist</span>
            </>
          )}
        </>
      )}
    </button>
  );
}
