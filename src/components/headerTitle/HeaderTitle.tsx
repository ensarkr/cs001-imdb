import { Link } from "react-router-dom";
import styles from "./headerTitle.module.css";
import Icon from "../icon/Icon";

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
      {href && <Icon color={color} type="right"></Icon>}
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
