import React from "react";
import styles from "./GitHubButton.module.css";

/*
 ** Heavily inspired by https://www.npmjs.com/package/react-github-button
 ** created by Benjy Cui https://github.com/benjycui
 */

function ajaxGet(url, callback) {
  if (typeof XDomainRequest !== "undefined") {
    callback(null);
    return null;
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
  return xhr;
}

const typeToLabel = {
  stargazers: "Star",
  watchers: "Watch",
  forks: "Fork",
};

const typeToPath = {
  forks: "network",
};

export default class GitHubButton extends React.Component {
  state = {
    count: null,
  };
  componentDidMount() {
    this.xhr = ajaxGet(this.getRequestUrl(), (response) => {
      this.setCount(response);
    });
  }

  componentWillUnmount() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  setCount(data) {
    if (!data) return;
    const count = data[`${this.props.type}_count`];
    this.setState({ count });
  }
  getRequestUrl() {
    const { namespace, repo } = this.props;
    return `//api.github.com/repos/${namespace}/${repo}`;
  }
  getRepoUrl() {
    const { namespace, repo } = this.props;
    return `//github.com/${namespace}/${repo}/`;
  }
  getCountUrl() {
    const { namespace, repo, type } = this.props;
    return `//github.com/${namespace}/${repo}/${typeToPath[type] || type}/`;
  }
  render() {
    const count = this.state.count;

    return (
      <div className={styles.widget}>
        <a className={styles.btn} href={this.getRepoUrl()} target="_blank">
          {this.props.type == "stargazers" && (
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
          {this.props.type == "forks" && (
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
          <span>{typeToLabel[this.props.type]}</span>
        </a>
        {count !== null && (
          <a
            className={styles.social_count}
            target="_blank"
            href={this.getCountUrl()}
          >
            {count}
          </a>
        )}
      </div>
    );
  }
}
