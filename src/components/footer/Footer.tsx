import { RecentlyViewedSideScroll } from "../sideScroll/SideScroll";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <RecentlyViewedSideScroll></RecentlyViewedSideScroll>
        <div className={styles.bottomContent}>
          <div className={styles.icons}>
            <button
              onClick={() => {
                window.open("https://github.com/ensarkr", "_blank");
              }}
              title="https://github.com/ensarkr"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                ></path>
              </svg>
            </button>

            <button
              onClick={() => {
                window.open("mailto:eyupensarkara@gmail.com", "blank");
              }}
              title="eyupensarkara@gmail.com"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
              </svg>
            </button>
          </div>
          <div className={styles.links}>
            <button
              onClick={() => {
                window.open(
                  "https://github.com/ensarkr/cawcaw-react-native",
                  "blank"
                );
              }}
              title="cawcaw-react-native"
            >
              Get the CAWCAW app
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </button>
            <button
              onClick={() => {
                window.open("https://github.com/ensarkr/cs001-imbd", "blank");
              }}
              title="https://github.com/ensarkr/cs001-imbd"
            >
              Github Repository
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path d="M21.6 21.6H2.4V2.4h7.2V0H0v24h24v-9.6h-2.4v7.2zM14.4 0v2.4h4.8L7.195 14.49l2.4 2.4L21.6 4.8v4.8H24V0h-9.6z"></path>
              </svg>
            </button>
          </div>
          <div className={styles.text}>© 2024 by ensarkr</div>
        </div>
      </div>
    </div>
  );
}
