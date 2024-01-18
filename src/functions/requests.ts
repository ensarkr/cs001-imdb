import { doubleReturn } from "../typings/global";
import { userT } from "../typings/user";

async function requestNewRequestToken(): Promise<
  doubleReturn<{ requestToken: string }>
> {
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
}

async function requestSessionID(
  requestToken: string
): Promise<doubleReturn<{ sessionID: string }>> {
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
}

async function requestUserDetailsViaSessionID(
  sessionID: string
): Promise<doubleReturn<userT>> {
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
}

async function requestDeleteSessionID(sessionID: string): Promise<undefined> {
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
}

export {
  requestNewRequestToken,
  requestSessionID,
  requestUserDetailsViaSessionID,
  requestDeleteSessionID,
};
