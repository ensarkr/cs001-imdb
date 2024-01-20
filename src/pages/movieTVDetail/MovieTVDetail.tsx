import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { doubleReturn } from "../../typings/global";
import { movieDetailT } from "../../typings/movie";
import styles from "./movieTVDetail.module.css";
import HeroPart from "./heroPart/HeroPart";
import { SideScrollWithNoFetch } from "../../components/sideScroll/SideScroll";
import ActorCard from "../../components/actor/actorCard/ActorCard";
import MovieTVCard from "../../components/movieTV/movieTVCard/MovieTVCard";
import { TVDetailT } from "../../typings/tv";

export default function MovieTVDetail() {
  const data = useLoaderData() as doubleReturn<movieDetailT | TVDetailT>;
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.status) navigate("/");
  }, []);

  if (!data.status) return <></>;

  return (
    <main className={styles.mainDetail}>
      <HeroPart data={data.value}></HeroPart>
      <div className={styles.content}>
        <SideScrollWithNoFetch
          headerTitleProps={{ title: "Videos", color: "black" }}
          viewerHeight="calc(var(--video-width) * 9 / 16 + 1.5rem)"
        >
          {data.value.videos.slice(0, 5).map((e) => (
            <div className={styles.videoDiv} key={e.id}>
              <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${e.key}`}
              ></iframe>
              <p>{e.name}</p>
            </div>
          ))}
        </SideScrollWithNoFetch>

        <SideScrollWithNoFetch
          headerTitleProps={{ title: "Photos", color: "black" }}
          viewerHeight="var(--card-width)"
        >
          {data.value.images.slice(0, 20).map((e) => (
            <img
              key={e}
              className={styles.image}
              src={`https://image.tmdb.org/t/p/w500/${e}`}
            ></img>
          ))}
        </SideScrollWithNoFetch>

        <SideScrollWithNoFetch
          headerTitleProps={{ title: "Actors", color: "black" }}
          viewerHeight="calc(var(--card-width) + 4rem + 3.2px)"
        >
          {data.value.cast
            .filter((e) => e.department === "Acting")
            .slice(0, 20)
            .map((e) => (
              <ActorCard
                data={e}
                color="black"
                character={e.character}
              ></ActorCard>
            ))}
        </SideScrollWithNoFetch>
        <SideScrollWithNoFetch
          headerTitleProps={{ title: "More like this", color: "black" }}
          viewerHeight="calc((var(--card-width) * 3 / 2) + 167.96px)"
        >
          {data.value.similar.map((e) => (
            <MovieTVCard key={e.id} data={e} color="white"></MovieTVCard>
          ))}
        </SideScrollWithNoFetch>
      </div>
    </main>
  );
}
