import { MouseEvent, useState } from "react";
import { movieT } from "../../typings/movie";
import { TVT } from "../../typings/tv";
import styles from "./favoriteButton.module.css";
import { useFavorites } from "../../context/FavoritesContext";
import CircleLoader from "../circleLoader/CircleLoader";
import Icon from "../icon/Icon";

/*
Renders favorite button
Which is filled or unfilled heart depending on the movie/tv in favorites or not
By clicking states can be switched
Default height is 100%
*/

export default function FavoriteButton({
  data,
  unCheckedHeartColor,
  height,
}: {
  data: movieT | TVT;
  unCheckedHeartColor: "black" | "white";
  height?: string;
}) {
  const favorites = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.isFavorite(data);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isFavorite) {
      await favorites.removeFromFavorites(data);
    } else {
      await favorites.addToFavorites(data);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={styles.favorite}
      style={height === undefined ? {} : { height: height }}
    >
      {favorites.data.status === "loading" || isLoading ? (
        <CircleLoader color="var(--yellow-color)"></CircleLoader>
      ) : (
        <button onClick={handleClick} className={styles.favoriteButton}>
          {isFavorite ? (
            <Icon type="heart"></Icon>
          ) : (
            <Icon type="heartOutline" color={unCheckedHeartColor}></Icon>
          )}
        </button>
      )}
    </div>
  );
}
