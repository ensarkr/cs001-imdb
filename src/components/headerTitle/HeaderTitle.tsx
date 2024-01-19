import { Link } from "react-router-dom";
import styles from "./headerTitle.module.css";

export type headerTitleProps = {
  title: string;
  subTitle?: string;
  href?: string;
  color?: "black" | "white";
};

export default function HeaderTitle({
  title,
  subTitle,
  href,
  color = "white",
}: headerTitleProps) {
  const content = (
    <>
      <div className={styles.rect}></div>
      <h2 className={styles.title}>{title}</h2>
      {href && (
        <svg
          width="1.2rem"
          height="1.2rem"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.icon}
          fill={color}
          role="presentation"
        >
          <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
        </svg>
      )}
    </>
  );

  const contentStyle = [
    styles.main,
    subTitle === undefined ? styles.noSubtitle : {},
    color === "black" ? styles.black : {},
  ].join(" ");

  return (
    <>
      {href !== undefined ? (
        <Link to={href} className={contentStyle}>
          {content}
        </Link>
      ) : (
        <div className={contentStyle}>{content}</div>
      )}
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
    </>
  );
}
