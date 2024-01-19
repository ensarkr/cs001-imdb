import { Link } from "react-router-dom";
import styles from "./bigHeaderTitle.module.css";

export type bigHeaderTitleProps = {
  title: string;
  link?: { href: string; text: string };
};

export default function BigHeaderTitle({ title, link }: bigHeaderTitleProps) {
  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>{title}</h1>

        {link !== undefined && (
          <Link to={link.href} className={styles.link}>
            {link.text}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
            </svg>
          </Link>
        )}
      </div>
    </>
  );
}
