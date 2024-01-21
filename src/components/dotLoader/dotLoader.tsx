import styles from "./dotLoader.module.css";

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
