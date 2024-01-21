/* eslint-disable @typescript-eslint/no-explicit-any */

import { actorT } from "../typings/actor";
import { movieT, movieDetailT } from "../typings/movie";
import { TVT, TVDetailT } from "../typings/tv";

function convertDBtoNormalMovie(movie: any): movieT {
  return {
    type: "movie",
    id: movie.id,
    genres: movie.genre_ids
      .map((e: number) => getMovieGenre(e))
      .filter((e: null) => e !== null),
    title: movie.title,
    originalTitle: movie.original_title,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    overview: movie.overview,
    popularity: movie.popularity,
  };
}
function convertDBtoNormalMovies(movies: any[]): movieT[] {
  return movies.map((e) => convertDBtoNormalMovie(e));
}

function convertDBtoNormalMoviesWithCharacter(
  movies: any[]
): (movieT & { character: string })[] {
  return movies.map((e) => {
    {
      return { ...convertDBtoNormalMovie(e), character: e.character };
    }
  });
}

function convertDBtoNormalTV(TV: any): TVT {
  return {
    type: "tv",
    id: TV.id,
    genres: TV.genre_ids
      .map((e: number) => getMovieGenre(e))
      .filter((e: null) => e !== null),
    title: TV.name,
    releaseDate: TV.first_air_date,
    backdropPath: TV.backdrop_path,
    posterPath: TV.poster_path,
    voteAverage: TV.vote_average,
    overview: TV.overview,
    popularity: TV.popularity,
  };
}
function convertDBtoNormalTVs(TVs: any[]): TVT[] {
  return TVs.map((e) => convertDBtoNormalTV(e));
}

function convertDBtoNormalTVsWithCharacter(
  TVs: any[]
): (TVT & { character: string })[] {
  return TVs.map((e) => {
    {
      return { ...convertDBtoNormalTV(e), character: e.character };
    }
  });
}

function convertDBtoNormalActor(actor: any): actorT {
  return {
    id: actor.id,
    gender:
      actor.gender === "1" ? "female" : actor.gender === "2" ? "male" : "N/A",
    department: actor.known_for_department,
    name: actor.name,
    avatarPath: actor.profile_path,
  };
}
function convertDBtoNormalActors(actors: any[]): actorT[] {
  return actors.map((e) => convertDBtoNormalActor(e));
}

function convertDBtoNormalMovieDetail(movieDetail: any): movieDetailT {
  return {
    type: "movie",
    id: movieDetail.id,
    releaseDate: movieDetail.release_date,
    genres: movieDetail.genres
      .map((e: { id: number }) => getMovieGenre(e.id))
      .filter((e: null) => e !== null),
    title: movieDetail.title,
    originalTitle: movieDetail.original_title,
    backdropPath: movieDetail.backdrop_path,
    posterPath: movieDetail.poster_path,
    voteAverage: movieDetail.vote_average,
    budget: movieDetail.budget,
    cast: [
      ...(movieDetail.credits.cast as any[]).map((e) => {
        return { ...convertDBtoNormalActor(e), character: e.character };
      }),
      ...(movieDetail.credits.crew as any[]).map((e) => {
        return { ...convertDBtoNormalActor(e), character: e.character };
      }),
    ],
    images: (movieDetail.images.backdrops as any[]).map((e) => {
      return e.file_path;
    }),
    overview: movieDetail.overview,
    popularity: movieDetail.popularity,
    productionCompanies: movieDetail.production_companies.map(
      (e: { name: any }) => e.name
    ),
    productionCountries: movieDetail.production_countries.map(
      (e: { name: any }) => e.name
    ),
    revenue: movieDetail.revenue,
    reviews: movieDetail.reviews.results
      .map(
        (e: {
          author_details: { username: any; rating: any };
          content: any;
        }) => {
          return {
            username: e.author_details.username,
            rating: e.author_details.rating,
            content: e.content,
          };
        }
      )
      .slice(0, 3),
    runtime: movieDetail.runtime,
    similar: movieDetail.similar.results.map((e: any) =>
      convertDBtoNormalMovie(e)
    ),
    videos: (movieDetail.videos.results as any[])
      .filter((e) => e.site === "YouTube")
      .map((e) => {
        return {
          id: e.id,
          key: e.key,
          name: e.name,
        };
      }),
    voteCount: movieDetail.vote_count,
  };
}

function convertDBtoNormalTVDetail(TVDetail: any): TVDetailT {
  return {
    type: "tv",
    id: TVDetail.id,
    genres: TVDetail.genres
      .map((e: { id: number }) => getMovieGenre(e.id))
      .filter((e: null) => e !== null),
    title: TVDetail.name,
    backdropPath: TVDetail.backdrop_path,
    posterPath: TVDetail.poster_path,
    voteAverage: TVDetail.vote_average,
    cast: [
      ...(TVDetail.credits.cast as any[]).map((e) => {
        return { ...convertDBtoNormalActor(e), character: e.character };
      }),
      ...(TVDetail.credits.crew as any[]).map((e) => {
        return { ...convertDBtoNormalActor(e), character: e.character };
      }),
    ],
    images: (TVDetail.images.backdrops as any[]).map((e) => {
      return e.file_path;
    }),
    overview: TVDetail.overview,
    popularity: TVDetail.popularity,
    productionCompanies: TVDetail.production_companies.map(
      (e: { name: any }) => e.name
    ),
    productionCountries: TVDetail.production_countries.map(
      (e: { name: any }) => e.name
    ),
    releaseDate: TVDetail.first_air_date,
    reviews: TVDetail.reviews.results
      .map(
        (e: {
          author_details: { username: any; rating: any };
          content: any;
        }) => {
          return {
            username: e.author_details.username,
            rating: e.author_details.rating,
            content: e.content,
          };
        }
      )
      .slice(0, 3),
    similar: TVDetail.similar.results.map((e: any) => convertDBtoNormalTV(e)),
    videos: (TVDetail.videos.results as any[])
      .filter((e) => e.site === "YouTube")
      .map((e) => {
        return {
          id: e.id,
          key: e.key,
          name: e.name,
        };
      }),
    voteCount: TVDetail.vote_count,
  };
}

function convertDetailtoNormalMovieTV(
  movieTVDetail: movieDetailT | TVDetailT
): movieT | TVT {
  return {
    type: "tv",
    id: movieTVDetail.id,
    genres: movieTVDetail.genres,
    title: movieTVDetail.title,
    backdropPath: movieTVDetail.backdropPath,
    posterPath: movieTVDetail.posterPath,
    voteAverage: movieTVDetail.voteAverage,
    overview: movieTVDetail.overview,
    popularity: movieTVDetail.popularity,
    releaseDate: movieTVDetail.releaseDate,
  };
}

function getMovieGenre(id: number): string | null {
  if (genreIds[id as keyof typeof genreIds] === undefined) return null;
  return genreIds[id as keyof typeof genreIds];
}

export {
  convertDBtoNormalMovie,
  convertDBtoNormalMovies,
  convertDBtoNormalTV,
  convertDBtoNormalTVs,
  convertDBtoNormalActor,
  convertDBtoNormalActors,
  convertDBtoNormalMovieDetail,
  convertDBtoNormalTVDetail,
  convertDBtoNormalMoviesWithCharacter,
  convertDBtoNormalTVsWithCharacter,
  convertDetailtoNormalMovieTV,
};

const genreIds = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
};
