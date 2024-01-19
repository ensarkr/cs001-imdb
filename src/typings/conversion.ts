import { actorT } from "./actor";
import { movieT } from "./movie";
import { TVT } from "./tv";

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

export {
  convertDBtoNormalMovie,
  convertDBtoNormalMovies,
  convertDBtoNormalTV,
  convertDBtoNormalTVs,
  convertDBtoNormalActor,
  convertDBtoNormalActors,
};
