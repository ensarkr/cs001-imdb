import { Link } from "react-router-dom";
import styles from "./bigHeaderTitle.module.css";
import Icon from "../icon/Icon";

/*
Renders title it can contain link 
Link is added to left button
*/

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
            {link.text}
            <Icon color="var(--blue-color)" type="right" height="80%"></Icon>
          </Link>
        )}
      </div>
    </>
  );
}
