import { movieDetailT, movieT } from "../../typings/movie";
import { TVDetailT, TVT } from "../../typings/tv";
import styles from "./heroPart.module.css";
import FavoriteButton from "../favoriteButton/FavoriteButton";
import Icon from "../icon/Icon";
import CircleLoader from "../circleLoader/CircleLoader";
import useWatchlistButton from "../../hooks/useWatchListButton";
import { Link } from "react-router-dom";

/*
Renders hero part of movie/tv detail page 
*/

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
                  <Icon type="star" height="1.6rem"></Icon>

                  <div>
                    <p className={styles.voteAverage}>
                      <span>
                        {data.voteAverage.toString().slice(0, 3).endsWith("0")
                          ? data.voteAverage.toString().slice(0, 1)
                          : data.voteAverage.toString().slice(0, 3)}
                      </span>
                      /10
                    </p>
                    <p>{data.voteCount}</p>
                  </div>
                </div>
              </div>
              <div className={styles.stat}>
                <p>FAVORITE</p>
                <div className={styles.favorite}>
                  <FavoriteButton
                    data={data}
                    unCheckedHeartColor="white"
                    height="1.8rem"
                  ></FavoriteButton>
                </div>
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
                <Icon type="videos" height="1.3rem"></Icon>
                {data.videos.length} VIDEOS
              </div>
              <div>
                <Icon type="photos" height="1.3rem"></Icon>
                {data.images.length} PHOTOS
              </div>
            </div>
          </div>
          <div className={styles.summary}>
            <ul className={styles.details}>
              {data.genres.length > 0 && (
                <ul className={styles.genres}>
                  {data.genres.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              )}
              <li>
                {data.overview.length === 0
                  ? "No overview found"
                  : data.overview}
              </li>
              <li className={styles.smallStats}>
                <div className={styles.stat}>
                  <Icon type="star" height="1.2rem"></Icon>

                  <div className={styles.voteAverage}>
                    <p>
                      <span>
                        {data.voteAverage.toString().slice(0, 3).endsWith("0")
                          ? data.voteAverage.toString().slice(0, 1)
                          : data.voteAverage.toString().slice(0, 3)}
                      </span>
                      /10 {" " + data.voteCount}
                    </p>
                  </div>
                </div>
                <div className={styles.stat}>
                  <FavoriteButton
                    data={data}
                    unCheckedHeartColor="white"
                    height="1.3rem"
                  ></FavoriteButton>
                </div>
                <div className={styles.stat}>{Math.floor(data.popularity)}</div>
              </li>

              <hr className={styles.line}></hr>

              {data.cast.filter((e) => e.department === "Directing").length >
                0 && (
                <>
                  <li>
                    Director{" "}
                    <ul className={styles.innerList}>
                      {data.cast
                        .filter((e) => e.department === "Directing")
                        .slice(0, 3)
                        .map((e) => (
                          <li key={e.id}>
                            <Link to={`/${e.id}/credits`}>{e.name}</Link>
                          </li>
                        ))}
                    </ul>
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
                        .slice(0, 3)
                        .map((e) => (
                          <li key={e.id}>
                            <Link to={`/${e.id}/credits`}>{e.name}</Link>
                          </li>
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
                        <li key={e.id}>
                          <Link to={`/${e.id}/credits`}>{e.name}</Link>
                        </li>
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

/*
Renders main trailer of the movie/tv 

If video title includes "trailer" it renders that video
Else it renders first trailer

If there is no trailer exists it render "Trailer no found"
*/

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
          allow="fullscreen;"
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

/*
Renders favorite button
Which is plus or check icon depending on the movie/tv in watchlist or not
By clicking states can be switched
*/

function WatchlistButton({ data }: { data: movieT | TVT }) {
  const { handleClick, inWatchlist, isLoading, watchlistStatus } =
    useWatchlistButton(data);

  return (
    <button onClick={handleClick} className={styles.watchList}>
      {watchlistStatus === "loading" || isLoading ? (
        <CircleLoader color="black" height="50%"></CircleLoader>
      ) : (
        <>
          {inWatchlist ? (
            <>
              <Icon type="check" color="black" height="60%" />
              <span>In Watchlist</span>
            </>
          ) : (
            <>
              <Icon type="plus" color="black" height="60%" />
              <span>Add to Watchlist</span>
            </>
          )}
        </>
      )}
    </button>
  );
}
