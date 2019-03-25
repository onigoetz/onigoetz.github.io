import React from "react";
import { styled } from "linaria/react";

import Card, { CardItem } from "./Card";
import GitHubButton from "./GitHubButton";
import Technology from "./Technology";
import Status from "./Status";

const StatusBadges = styled.span`
  a,
  p {
    display: inline-block;
  }

  > a {
    display: inline-block;
    line-height: 0;
  }
`;

export default function Project({ project }) {
  const [owner, repo] = (project.githubRepository || "/").split("/");

  return (
    <Card>
      <CardItem>
        <h4>
          <a
            href={
              project.url
                ? project.url
                : `https://github.com/${project.githubRepository}`
            }
          >
            {project.title}
            {project.technologies &&
              project.technologies.map(tag => (
                <Technology key={tag} technology={tag} />
              ))}
          </a>
        </h4>
      </CardItem>
      <CardItem>
        <Status status={project.status} />
        {project.githubRepository && (
          <>
            <GitHubButton type="stargazers" namespace={owner} repo={repo} />
            <GitHubButton type="forks" namespace={owner} repo={repo} />
          </>
        )}
        <br />
        {project.badges && (
          <StatusBadges
            dangerouslySetInnerHTML={{
              __html: project.badges.childMarkdownRemark.html
            }}
          />
        )}
      </CardItem>
      <CardItem>
        {project.description}
        {project.documentation && (
          <>
            <br />
            <a href={project.documentation}>Documentation</a>
          </>
        )}
      </CardItem>
    </Card>
  );
}
