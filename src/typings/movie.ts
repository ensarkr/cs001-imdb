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

export { movieT };
