import { actorT } from "./actor";

type TVT = {
  type: "tv";
  id: number;
  genres: string[];
  title: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
  releaseDate: string;
  overview: string;
  popularity: number;
};

type TVDetailT = TVT & {
  productionCompanies: string[];
  productionCountries: string[];
  voteCount: number;
  images: string[];
  videos: { name: string; key: string; id: string }[];
  cast: (actorT & { character: string })[];
  similar: TVT[];
  reviews: { username: string; rating: number; content: string }[];
  runtime?: never;
};

export { TVT, TVDetailT };
