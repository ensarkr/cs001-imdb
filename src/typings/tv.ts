import { actorT } from "./actor";

type TVT = {
  type: "tv";
  id: number;
  genreIds: number[];
  title: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
};

type TVDetailT = TVT & {
  overview: string;
  popularity: number;
  productionCompanies: string[];
  productionCountries: string[];
  releaseDate: string;
  voteCount: number;
  images: string[];
  videos: { name: string; key: string; id: string }[];
  cast: (actorT & { character: string })[];
  similar: TVT[];
  reviews: { username: string; rating: number; content: string }[];
  runtime?: never;
};

export { TVT, TVDetailT };
