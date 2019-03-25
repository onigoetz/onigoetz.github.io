import React from "react";
import { styled } from "linaria/react";

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
export function classNames(classSet) {
  return Object.keys(classSet)
    .filter(key => classSet[key])
    .join(" ");
}

const typeToLabel = {
  stargazers: "Star",
  watchers: "Watch",
  forks: "Fork"
};

const typeToPath = {
  forks: "network"
};

const GHWrapper = styled.span`
  font: bold 11px/14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  height: 25px;
  line-height: 25px;
  overflow: hidden;
  margin-left: 0.5em;
`;

const GHBase = styled.a`
  padding: 2px 5px 2px 4px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 3px;
`;

const GHBtn = styled(GHBase)`
  background-color: #eee;
  background-image: linear-gradient(to bottom, #fcfcfc 0, #eee 100%);
  background-repeat: no-repeat;
  border: 1px solid #d5d5d5;

  &:hover,
  &:focus {
    text-decoration: none;
    background-color: #ddd;
    background-image: linear-gradient(to bottom, #eee 0, #ddd 100%);
    border-color: #ccc;
  }
  &:active {
    background-image: none;
    background-color: #dcdcdc;
    border-color: #b5b5b5;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const GHIcon = styled.span`
  width: 14px;
  height: 14px;
  margin-right: 4px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMTIgMTIgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMTIgMTIgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5YzAgOC40IDUuNSAxNS41IDEzIDE4YzEgMC4yIDEuMy0wLjQgMS4zLTAuOWMwLTAuNSAwLTEuNyAwLTMuMiBjLTUuMyAxLjEtNi40LTIuNi02LjQtMi42QzIwIDQxLjYgMTguOCA0MSAxOC44IDQxYy0xLjctMS4yIDAuMS0xLjEgMC4xLTEuMWMxLjkgMC4xIDIuOSAyIDIuOSAyYzEuNyAyLjkgNC41IDIuMSA1LjUgMS42IGMwLjItMS4yIDAuNy0yLjEgMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEgMC43LTMuNyAyLTUuMWMtMC4yLTAuNS0wLjgtMi40IDAuMi01YzAgMCAxLjYtMC41IDUuMiAyIGMxLjUtMC40IDMuMS0wLjcgNC44LTAuN2MxLjYgMCAzLjMgMC4yIDQuNyAwLjdjMy42LTIuNCA1LjItMiA1LjItMmMxIDIuNiAwLjQgNC42IDAuMiA1YzEuMiAxLjMgMiAzIDIgNS4xYzAgNy4zLTQuNSA4LjktOC43IDkuNCBjMC43IDAuNiAxLjMgMS43IDEuMyAzLjVjMCAyLjYgMCA0LjYgMCA1LjJjMCAwLjUgMC40IDEuMSAxLjMgMC45YzcuNS0yLjYgMTMtOS43IDEzLTE4LjFDNTEgMjEuOSA0Mi41IDEzLjQgMzIgMTMuNHoiLz48L3N2Zz4=");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: inline-block;
  transform: translateY(3px);
`;

const GHText = styled.span``;

const GHCount = styled(GHBase)`
  position: relative;
  margin-left: 4px;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;

  &:hover,
  &:focus {
    color: #4183c4;
  }
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }
  &:before {
    top: 50%;
    left: -3px;
    margin-top: -4px;
    border-width: 4px 4px 4px 0;
    border-right-color: #fafafa;
  }
  &:after {
    top: 50%;
    left: -4px;
    z-index: -1;
    margin-top: -5px;
    border-width: 5px 5px 5px 0;
    border-right-color: #d4d4d4;
  }
`;

export default class GitHubButton extends React.Component {
  state = {
    count: null
  };
  componentDidMount() {
    this.xhr = ajaxGet(this.getRequestUrl(), response => {
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
      <GHWrapper>
        <GHBtn href={this.getRepoUrl()} target="_blank">
          <GHIcon aria-hidden="true" />
          <GHText>{typeToLabel[this.props.type]}</GHText>
        </GHBtn>
        {count !== null && (
          <GHCount
            target="_blank"
            href={this.getCountUrl()}
          >
            {count}
          </GHCount>
        )}
      </GHWrapper>
    );
  }
}
