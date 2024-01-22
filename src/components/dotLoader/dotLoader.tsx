import styles from "./dotLoader.module.css";

/*
Renders dot loading animation
Default height is 100%
*/

export default function DotLoader({
  height,
  color,
}: {
  height?: string;
  color?: "white" | "black";
}) {
  return (
    <div className={styles.loader} style={height ? { height } : {}}>
      <div
        className={[
          styles.progress,
          color === "white" ? styles.white : "",
        ].join(" ")}
      />
    </div>
  );
}
