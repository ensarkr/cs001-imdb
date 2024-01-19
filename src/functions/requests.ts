import { actorT } from "../typings/actor";
import {
  convertDBtoNormalActors,
  convertDBtoNormalMovies,
  convertDBtoNormalTVs,
} from "../typings/conversion";
import { doubleReturn } from "../typings/global";
import { movieT } from "../typings/movie";
import { TVT } from "../typings/tv";
import { userT } from "../typings/user";

async function requestNewRequestToken(): Promise<
  doubleReturn<{ requestToken: string }>
> {
  try {
    const url = "https://api.themoviedb.org/3/authentication/token/new";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success === true) {
      return { status: true, value: { requestToken: data.request_token } };
    } else {
      return { status: false, message: "Request token error." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestSessionID(
  requestToken: string
): Promise<doubleReturn<{ sessionID: string }>> {
  try {
    const url = "https://api.themoviedb.org/3/authentication/session/new";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({ request_token: requestToken }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success === true) {
      return { status: true, value: { sessionID: data.session_id } };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestUserDetailsViaSessionID(
  sessionID: string
): Promise<doubleReturn<userT>> {
  try {
    const url = `https://api.themoviedb.org/3/account?session_id=${sessionID}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (Object.keys(data).includes("username")) {
      return {
        status: true,
        value: {
          accountID: data.id,
          avatar: data.avatar,
          name: data.name,
          username: data.username,
        },
      };
    } else {
      return { status: false, message: "Request error." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestDeleteSessionID(
  sessionID: string
): Promise<doubleReturn<undefined>> {
  try {
    const url = `https://api.themoviedb.org/3/authentication/session`;
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionID,
      }),
    };

    await fetch(url, options);

    return { status: true };
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestPopularMovies(
  page?: number
): Promise<doubleReturn<movieT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalMovies(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestTopRatedMovies(
  page?: number
): Promise<doubleReturn<movieT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalMovies(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestAiringTVs(page?: number): Promise<doubleReturn<TVT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalTVs(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestNowPlayingMovies(
  page?: number
): Promise<doubleReturn<movieT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalMovies(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestUpcomingMovies(
  page?: number
): Promise<doubleReturn<movieT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/movie/upcoming?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalMovies(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestPopularActors(
  page?: number
): Promise<doubleReturn<actorT[]>> {
  try {
    const url = `https://api.themoviedb.org/3/person/popular?page=${
      page === undefined ? 1 : page
    }`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
        value: convertDBtoNormalActors(data.results),
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

type requestAllFavoritesReturnT = {
  tvs: TVT[];
  movies: movieT[];
};

async function requestAllFavorites(
  accountID: number
): Promise<doubleReturn<requestAllFavoritesReturnT>> {
  let currentPage = 1;
  let pageLimit = 0;
  const result: requestAllFavoritesReturnT = {
    tvs: [],
    movies: [],
  };

  try {
    do {
      const url = `https://api.themoviedb.org/3/account/${accountID}/favorite/tv?language=en-US&sort_by=created_at.asc&page=${currentPage++}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (data.success !== false) {
        pageLimit = data.total_pages;
        result.tvs.push(...convertDBtoNormalTVs(data.results));
      } else {
        return { status: false, message: "Session denied." };
      }
    } while (currentPage <= pageLimit);

    currentPage = 1;
    pageLimit = 0;

    do {
      const url = `https://api.themoviedb.org/3/account/${accountID}/favorite/movies?language=en-US&sort_by=created_at.asc&page=${currentPage++}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (data.success !== false) {
        pageLimit = data.total_pages;
        result.movies.push(...convertDBtoNormalMovies(data.results));
      } else {
        return { status: false, message: "Session denied." };
      }
    } while (currentPage <= pageLimit);

    return { status: true, value: result };
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestToFavorites(
  accountID: number,
  type: "movie" | "tv",
  id: number,
  addAction: boolean
): Promise<doubleReturn<undefined>> {
  try {
    const url = `https://api.themoviedb.org/3/account/${accountID}/favorite`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
      body: JSON.stringify({
        media_type: type,
        media_id: id,
        favorite: addAction,
      }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

type requestAllWatchlistReturnT = {
  tvs: TVT[];
  movies: movieT[];
};

async function requestAllWatchlist(
  accountID: number
): Promise<doubleReturn<requestAllWatchlistReturnT>> {
  let currentPage = 1;
  let pageLimit = 0;
  const result: requestAllWatchlistReturnT = {
    tvs: [],
    movies: [],
  };

  try {
    do {
      const url = `https://api.themoviedb.org/3/account/${accountID}/watchlist/tv?language=en-US&sort_by=created_at.asc&page=${currentPage++}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (data.success !== false) {
        pageLimit = data.total_pages;
        result.tvs.push(...convertDBtoNormalTVs(data.results));
      } else {
        return { status: false, message: "Session denied." };
      }
    } while (currentPage <= pageLimit);

    currentPage = 1;
    pageLimit = 0;

    do {
      const url = `https://api.themoviedb.org/3/account/${accountID}/watchlist/movies?language=en-US&sort_by=created_at.asc&page=${currentPage++}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      if (data.success !== false) {
        pageLimit = data.total_pages;
        result.movies.push(...convertDBtoNormalMovies(data.results));
      } else {
        return { status: false, message: "Session denied." };
      }
    } while (currentPage <= pageLimit);

    return { status: true, value: result };
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

async function requestToWatchlist(
  accountID: number,
  type: "movie" | "tv",
  id: number,
  addAction: boolean
): Promise<doubleReturn<undefined>> {
  try {
    const url = `https://api.themoviedb.org/3/account/${accountID}/watchlist`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY as string,
      },
      body: JSON.stringify({
        media_type: type,
        media_id: id,
        watchlist: addAction,
      }),
    };

    const res = await fetch(url, options);
    const data = await res.json();

    if (data.success !== false) {
      return {
        status: true,
      };
    } else {
      return { status: false, message: "Session denied." };
    }
  } catch (error) {
    return { status: false, message: "Fetch error." };
  }
}

export {
  requestNewRequestToken,
  requestSessionID,
  requestUserDetailsViaSessionID,
  requestDeleteSessionID,
  requestPopularMovies,
  requestTopRatedMovies,
  requestAiringTVs,
  requestNowPlayingMovies,
  requestUpcomingMovies,
  requestPopularActors,
  requestAllFavorites,
  requestToFavorites,
  requestAllWatchlist,
  requestToWatchlist,
};
