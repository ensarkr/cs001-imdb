type userT = {
  sessionID: string;
  username: string;
  name: string;
  accountID: number;
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
};

export { userT };
