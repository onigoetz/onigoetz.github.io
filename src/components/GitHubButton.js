import React from "react";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import styles from "./GitHubButton.module.css";

/*
 ** Heavily inspired by https://www.npmjs.com/package/react-github-button
 ** created by Benjy Cui https://github.com/benjycui
 */

const cacheForever = {};

const typeToLabel = {
  stargazers: "Star",
  watchers: "Watch",
  forks: "Fork",
};

const typeToPath = {
  forks: "network",
};

export default function GitHubButton({ namespace, repo, type }) {
  const { data, error } = useSWR(
    `//api.github.com/repos/${namespace}/${repo}`,
    async (url) => {
      // Return from cache if we already have it.
      if (cacheForever.hasOwnProperty(url)) {
        return cacheForever[url];
      }

      // Cache the fetching promise
      cacheForever[url] = fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          // Delete from cache if fetching failed
          delete cacheForever[url];
          console.error(error);
        });

      // Return the fetcher
      return cacheForever[url];
    },
    { revalidateOnFocus: false },
  );

  return (
    <div className={styles.widget}>
      <a
        className={styles.btn}
        href={`//github.com/${namespace}/${repo}/`}
        target="_blank"
      >
        {type == "stargazers" && (
          <svg
            viewBox="0 0 14 16"
            className={styles.octicon}
            style={{ width: 14, height: 16 }}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
            ></path>
          </svg>
        )}
        {type == "forks" && (
          <svg
            viewBox="0 0 10 16"
            className={styles.octicon}
            style={{ width: 10, height: 16 }}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
            ></path>
          </svg>
        )}
        <span>{typeToLabel[type]}</span>
      </a>
      {data && (
        <a
          className={styles.social_count}
          target="_blank"
          href={`//github.com/${namespace}/${repo}/${
            typeToPath[type] || type
          }/`}
        >
          {data[`${type}_count`]}
        </a>
      )}
    </div>
  );
}
