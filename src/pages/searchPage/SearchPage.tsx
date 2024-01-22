import { useParams } from "react-router-dom";
import styles from "./searchPage.module.css";
import {
  requestActorQuery,
  requestMovieQuery,
  requestTVQuery,
} from "../../functions/requests";
import MovieTVWideCard from "../../components/movieTV/movieTVWideCard/MovieTVWideCard";
import ActorWideCard from "../../components/actor/actorWideCard/ActorWideCard";
import { memo } from "react";
import WideList from "../../components/wideList/WideList";

const MovieTVWideCard_MEMO = memo(MovieTVWideCard);
const ActorWideCard_MEMO = memo(ActorWideCard);

export default function SearchPage() {
  const params = useParams();

  return (
    <InnerSearchPage
      query={params.query as string}
      key={params.query as string}
    ></InnerSearchPage>
  );
}

function InnerSearchPage({ query }: { query: string }) {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Search "{query}"</h1>

        <WideList
          headerTitleProps={{ title: "Movies", color: "black" }}
          fetchOperation={async (fetchPage: number) =>
            await requestMovieQuery(fetchPage, query as string)
          }
          renderItem={(e) => (
            <MovieTVWideCard_MEMO data={e} key={e.id}></MovieTVWideCard_MEMO>
          )}
        ></WideList>
        <WideList
          headerTitleProps={{ title: "Shows", color: "black" }}
          fetchOperation={async (fetchPage: number) =>
            await requestTVQuery(fetchPage, query as string)
          }
          renderItem={(e) => (
            <MovieTVWideCard_MEMO data={e} key={e.id}></MovieTVWideCard_MEMO>
          )}
        ></WideList>
        <WideList
          headerTitleProps={{ title: "Actors", color: "black" }}
          fetchOperation={async (fetchPage: number) =>
            requestActorQuery(fetchPage, query as string)
          }
          renderItem={(e) => (
            <ActorWideCard_MEMO data={e} key={e.id}></ActorWideCard_MEMO>
          )}
        ></WideList>
      </div>
    </div>
  );
}
