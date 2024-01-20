import { actorT } from "./actor";

type movieT = {
  type: "movie";
  id: number;
  genreIds: number[];
  title: string;
  originalTitle: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
};

type movieDetailT = movieT & {
  budget: number;
  overview: string;
  popularity: number;
  productionCompanies: string[];
  productionCountries: string[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  voteCount: number;
  images: string[];
  videos: { name: string; key: string; id: string }[];
  cast: (actorT & { character: string })[];
  similar: movieT[];
  reviews: { username: string; rating: number; content: string }[];
};

export { movieT, movieDetailT };
