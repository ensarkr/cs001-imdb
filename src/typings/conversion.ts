/* eslint-disable @typescript-eslint/no-explicit-any */
import { actorT } from "./actor";
import { movieDetailT, movieT } from "./movie";
import { TVDetailT, TVT } from "./tv";

function convertDBtoNormalMovie(movie: any): movieT {
  return {
    type: "movie",
    id: movie.id,
    genreIds: movie.genre_ids,
    title: movie.title,
    originalTitle: movie.original_title,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
  };
}
function convertDBtoNormalMovies(movies: any[]): movieT[] {
  return movies.map((e) => convertDBtoNormalMovie(e));
}

function convertDBtoNormalTV(TV: any): TVT {
  return {
    type: "tv",
    id: TV.id,
    genreIds: TV.genre_ids,
    title: TV.name,
    backdropPath: TV.backdrop_path,
    posterPath: TV.poster_path,
    voteAverage: TV.vote_average,
  };
}
function convertDBtoNormalTVs(TVs: any[]): TVT[] {
  return TVs.map((e) => convertDBtoNormalTV(e));
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
    genreIds: movieDetail.genre_ids,
    title: movieDetail.title,
    originalTitle: movieDetail.original_title,
    backdropPath: movieDetail.backdrop_path,
    posterPath: movieDetail.poster_path,
    voteAverage: movieDetail.vote_average,
    budget: movieDetail.budget,
    cast: [
      ...(movieDetail.credits.cast as any[])
        .map((e) => {
          return { ...convertDBtoNormalActor(e), character: e.character };
        })
        .slice(0, 20),
      ...(movieDetail.credits.crew as any[])
        .map((e) => {
          return { ...convertDBtoNormalActor(e), character: e.character };
        })
        .slice(0, 20),
    ],
    images: (movieDetail.images.backdrops as any[]).map((e) => {
      return e.file_path;
    }),
    overview: movieDetail.overview,
    popularity: movieDetail.popularity,
    productionCompanies: movieDetail.production_companies.map((e) => e.name),
    productionCountries: movieDetail.production_countries.map((e) => e.name),
    releaseDate: movieDetail.release_date,
    revenue: movieDetail.revenue,
    reviews: movieDetail.reviews.results
      .map((e) => {
        return {
          username: e.author_details.username,
          rating: e.author_details.rating,
          content: e.content,
        };
      })
      .slice(0, 3),
    runtime: movieDetail.runtime,
    similar: movieDetail.similar.results.map((e) => convertDBtoNormalMovie(e)),
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
    genreIds: TVDetail.genre_ids,
    title: TVDetail.name,
    backdropPath: TVDetail.backdrop_path,
    posterPath: TVDetail.poster_path,
    voteAverage: TVDetail.vote_average,
    cast: [
      ...(TVDetail.credits.cast as any[])
        .map((e) => {
          return { ...convertDBtoNormalActor(e), character: e.character };
        })
        .slice(0, 20),
      ...(TVDetail.credits.crew as any[])
        .map((e) => {
          return { ...convertDBtoNormalActor(e), character: e.character };
        })
        .slice(0, 20),
    ],
    images: (TVDetail.images.backdrops as any[]).map((e) => {
      return e.file_path;
    }),
    overview: TVDetail.overview,
    popularity: TVDetail.popularity,
    productionCompanies: TVDetail.production_companies.map((e) => e.name),
    productionCountries: TVDetail.production_countries.map((e) => e.name),
    releaseDate: TVDetail.first_air_date,
    reviews: TVDetail.reviews.results
      .map((e) => {
        return {
          username: e.author_details.username,
          rating: e.author_details.rating,
          content: e.content,
        };
      })
      .slice(0, 3),
    similar: TVDetail.similar.results.map((e) => convertDBtoNormalTV(e)),
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

export {
  convertDBtoNormalMovie,
  convertDBtoNormalMovies,
  convertDBtoNormalTV,
  convertDBtoNormalTVs,
  convertDBtoNormalActor,
  convertDBtoNormalActors,
  convertDBtoNormalMovieDetail,
  convertDBtoNormalTVDetail,
};
