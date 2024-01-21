import { ReactNode } from "react";
import styles from "./movieTVCardButton.module.css";

export default function MovieTVCardButton({
  onClick,
  color = "black",
  useAlternativeWidth,
  children,
}: {
  onClick?: () => void;
  color?: "black" | "white";
  useAlternativeWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      className={[
        styles.main,
        useAlternativeWidth ? styles.alternativeWidth : "",
      ].join(" ")}
      onClick={onClick}
    >
      <div
        className={[
          styles.border,
          color === "white" ? styles.whiteBackground : "",
        ].join(" ")}
      >
        {children}
      </div>
    </button>
  );
}
