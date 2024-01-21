import BigHeaderTitle from "../../components/bigHeaderTitle/BigHeaderTitle";
import {
  ActorSideScroll,
  FromYourWatchlistSideScroll,
  MovieTVSideScroll,
} from "../../components/sideScroll/SideScroll";
import {
  requestTopRatedMovies,
  requestPopularMovies,
  requestAiringTVs,
  requestNowPlayingMovies,
  requestUpcomingMovies,
  requestPopularActors,
} from "../../functions/requests";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <BigHeaderTitle
          title="What to watch"
          link={{ href: "/whatToWatch/topPicks", text: "Get more recommendations" }}
        ></BigHeaderTitle>
        <MovieTVSideScroll
          headerTitleProps={{
            title: "Top picks",
            subTitle: "TV shows and movies just for you",
            href: "/whatToWatch/topPicks",
          }}
          fetchFunction={requestPopularMovies}
        ></MovieTVSideScroll>
        <FromYourWatchlistSideScroll></FromYourWatchlistSideScroll>
        <MovieTVSideScroll
          headerTitleProps={{
            title: "Top 20 on IMDb",
            href: "/whatToWatch/topIMDb",
          }}
          fetchFunction={requestTopRatedMovies}
        ></MovieTVSideScroll>
        <BigHeaderTitle title="Explore what's streaming"></BigHeaderTitle>
        <MovieTVSideScroll
          headerTitleProps={{
            title: "PRIME VIDEO",
            subTitle: "Included with Prime",
          }}
          fetchFunction={requestAiringTVs}
        ></MovieTVSideScroll>
        <BigHeaderTitle title="Explore Movies & TV shows"></BigHeaderTitle>
        <MovieTVSideScroll
          headerTitleProps={{
            title: "In theaters",
            subTitle: "Showtimes near you",
          }}
          fetchFunction={requestNowPlayingMovies}
        ></MovieTVSideScroll>
        <MovieTVSideScroll
          headerTitleProps={{
            title: "Coming soon to theaters",
          }}
          fetchFunction={requestUpcomingMovies}
        ></MovieTVSideScroll>
        <ActorSideScroll
          headerTitleProps={{
            title: "Popular actors",
          }}
          fetchFunction={requestPopularActors}
        ></ActorSideScroll>
      </div>
    </main>
  );
}
