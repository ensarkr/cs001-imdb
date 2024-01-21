import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { doubleReturn } from "../../typings/global";
import { movieDetailT, movieT } from "../../typings/movie";
import styles from "./movieTVDetail.module.css";
import HeroPart from "../../components/heroPart/HeroPart";
import { SideScrollWithNoFetch } from "../../components/sideScroll/SideScroll";
import ActorCard from "../../components/actor/actorCard/ActorCard";
import MovieTVCard from "../../components/movieTV/movieTVCard/MovieTVCard";
import { TVDetailT, TVT } from "../../typings/tv";
import { useRecentlyViewed } from "../../context/RecentlyViewedContext";

export default function MovieTVDetail() {
  const data = useLoaderData() as doubleReturn<movieDetailT | TVDetailT>;
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.status) navigate("/");
  }, [data]);

  if (!data.status) return <></>;

  return (
    <InnerMovieTVDetail
      key={data.value.id}
      data={data.value}
    ></InnerMovieTVDetail>
  );
}

function InnerMovieTVDetail({ data }: { data: movieDetailT | TVDetailT }) {
  return (
    <main className={styles.main}>
      <AddToRecentlyViewed movieTV={data}></AddToRecentlyViewed>
      <HeroPart data={data}></HeroPart>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <SideScrollWithNoFetch
            headerTitleProps={{ title: "Videos", color: "black" }}
            viewerHeight="var(--video-card-height)"
          >
            {data.videos.slice(0, 5).map((e) => (
              <div className={styles.videoDiv} key={e.id}>
                <iframe
                  allow="fullscreen;"
                  className={styles.video}
                  src={`https://www.youtube.com/embed/${e.key}`}
                ></iframe>
                <p>{e.name}</p>
              </div>
            ))}
          </SideScrollWithNoFetch>

          <SideScrollWithNoFetch
            headerTitleProps={{ title: "Photos", color: "black" }}
            viewerHeight="var(--photo-card-height)"
          >
            {data.images.slice(0, 20).map((e) => (
              <img
                key={e}
                className={styles.image}
                onClick={() => {
                  window.open(
                    `https://image.tmdb.org/t/p/original/${e}`,
                    "_blank"
                  );
                }}
                src={`https://image.tmdb.org/t/p/w500/${e}`}
              ></img>
            ))}
          </SideScrollWithNoFetch>

          <SideScrollWithNoFetch
            headerTitleProps={{ title: "Actors", color: "black" }}
            viewerHeight="var(--actor-card-height)"
          >
            {data.cast
              .filter((e) => e.department === "Acting")
              .slice(0, 20)
              .map((e) => (
                <ActorCard
                  key={e.id}
                  data={e}
                  color="black"
                  character={e.character}
                ></ActorCard>
              ))}
          </SideScrollWithNoFetch>
          <SideScrollWithNoFetch
            headerTitleProps={{ title: "More like this", color: "black" }}
            viewerHeight="var(--movieTV-card-height)"
          >
            {data.similar.map((e) => (
              <MovieTVCard key={e.id} data={e} color="white"></MovieTVCard>
            ))}
          </SideScrollWithNoFetch>
        </div>
      </div>
    </main>
  );
}

function AddToRecentlyViewed({ movieTV }: { movieTV: movieT | TVT }) {
  const recentlyViewed = useRecentlyViewed();

  useEffect(() => {
    recentlyViewed.addToRecentlyViewed(movieTV);
  }, []);

  return <></>;
}
