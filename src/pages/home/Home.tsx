import BigHeaderTitle from "../../components/bigHeaderTitle/BigHeaderTitle";
import {
  ActorSideScroll,
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
    <main className={styles.home}>
      <BigHeaderTitle
        title="What to watch"
        link={{ href: "/", text: "Get more recommendations" }}
      ></BigHeaderTitle>

      <MovieTVSideScroll
        headerTitleProps={{
          title: "Top picks",
          subTitle: "TV shows and movies just for you",
          href: "/",
        }}
        fetchFunction={requestPopularMovies}
      ></MovieTVSideScroll>

      <MovieTVSideScroll
        headerTitleProps={{
          title: "Top 20 on IMDb",
          href: "/",
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
          href: "/",
        }}
        fetchFunction={requestNowPlayingMovies}
      ></MovieTVSideScroll>

      <MovieTVSideScroll
        headerTitleProps={{
          title: "Coming soon to theaters",
          href: "/",
        }}
        fetchFunction={requestUpcomingMovies}
      ></MovieTVSideScroll>

      <ActorSideScroll
        headerTitleProps={{
          title: "Popular actors",
          href: "/",
        }}
        fetchFunction={requestPopularActors}
      ></ActorSideScroll>
    </main>
  );
}
