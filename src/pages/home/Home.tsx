import ActorCard from "../../components/actor/actorCard/ActorCard";
import BigHeaderTitle from "../../components/bigHeaderTitle/BigHeaderTitle";
import MovieTVCard from "../../components/movieTV/movieTVCard/MovieTVCard";
import SideScroll, {
  FromYourWatchlistSideScroll,
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
          link={{
            href: "/whatToWatch/topPicks",
            text: "Get more recommendations",
          }}
        ></BigHeaderTitle>

        <SideScroll
          fetchOperation={requestPopularMovies}
          renderItem={(e) => <MovieTVCard data={e} key={e.id}></MovieTVCard>}
          viewerHeight="var(--movieTV-card-height)"
          headerTitleProps={{
            title: "Top picks",
            subTitle: "TV shows and movies just for you",
            href: "/whatToWatch/topPicks",
          }}
        ></SideScroll>

        <FromYourWatchlistSideScroll></FromYourWatchlistSideScroll>

        <SideScroll
          fetchOperation={requestTopRatedMovies}
          renderItem={(e) => <MovieTVCard data={e} key={e.id}></MovieTVCard>}
          viewerHeight="var(--movieTV-card-height)"
          headerTitleProps={{
            title: "Top 20 on IMDb",
            href: "/whatToWatch/topIMDb",
          }}
        ></SideScroll>

        <BigHeaderTitle title="Explore what's streaming"></BigHeaderTitle>

        <SideScroll
          fetchOperation={requestAiringTVs}
          renderItem={(e) => <MovieTVCard data={e} key={e.id}></MovieTVCard>}
          viewerHeight="var(--movieTV-card-height)"
          headerTitleProps={{
            title: "PRIME VIDEO",
            subTitle: "Included with Prime",
          }}
        ></SideScroll>

        <BigHeaderTitle title="Explore Movies & TV shows"></BigHeaderTitle>

        <SideScroll
          fetchOperation={requestNowPlayingMovies}
          renderItem={(e) => <MovieTVCard data={e} key={e.id}></MovieTVCard>}
          viewerHeight="var(--movieTV-card-height)"
          headerTitleProps={{
            title: "In theaters",
            subTitle: "Showtimes near you",
          }}
        ></SideScroll>

        <SideScroll
          fetchOperation={requestUpcomingMovies}
          renderItem={(e) => <MovieTVCard data={e} key={e.id}></MovieTVCard>}
          viewerHeight="var(--movieTV-card-height)"
          headerTitleProps={{
            title: "Coming soon to theaters",
          }}
        ></SideScroll>

        <SideScroll
          fetchOperation={requestPopularActors}
          renderItem={(e) => <ActorCard data={e} key={e.id}></ActorCard>}
          viewerHeight="var(--actor-card-height)"
          headerTitleProps={{
            title: "Popular actors",
          }}
        ></SideScroll>
      </div>
    </main>
  );
}
