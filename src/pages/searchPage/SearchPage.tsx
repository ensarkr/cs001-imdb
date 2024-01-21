import { useParams } from "react-router-dom";
import styles from "./searchPage.module.css";
import {
  ActorWideList,
  MovieTVWideList,
} from "../../components/wideList/WideList";
import {
  requestActorQuery,
  requestMovieQuery,
  requestTVQuery,
} from "../../functions/requests";

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

        <MovieTVWideList
          headerTitleProps={{ title: "Movies", color: "black" }}
          fetchFunction={async (page) =>
            await requestMovieQuery(page, query as string)
          }
        ></MovieTVWideList>
        <MovieTVWideList
          headerTitleProps={{ title: "Shows", color: "black" }}
          fetchFunction={async (page) =>
            await requestTVQuery(page, query as string)
          }
        ></MovieTVWideList>
        <ActorWideList
          headerTitleProps={{ title: "Actors", color: "black" }}
          fetchFunction={async (page) =>
            await requestActorQuery(page, query as string)
          }
        ></ActorWideList>
      </div>
    </div>
  );
}
