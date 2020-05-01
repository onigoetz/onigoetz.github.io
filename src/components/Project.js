import React from "react";

import Card, { CardItem } from "./Card";
import GitHubButton from "./GitHubButton";
import Technology from "./Technology";
import Status from "./Status";

import styles from "./Project.module.css";

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
              project.technologies.map((tag) => (
                <Technology key={tag} technology={tag} />
              ))}
          </a>
        </h4>
      </CardItem>
      <CardItem>
        <div className={styles.status}>
          <Status status={project.status} />
          {project.githubRepository && (
            <>
              <GitHubButton type="stargazers" namespace={owner} repo={repo} />
              <GitHubButton type="forks" namespace={owner} repo={repo} />
            </>
          )}
        </div>

        {project.badges && (
          <span
            className={styles.badges}
            dangerouslySetInnerHTML={{ __html: project.badges }}
          />
        )}
      </CardItem>
      <CardItem>
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
        {project.documentation && (
          <>
            <br />
            <a href={project.documentation} target="_blank" rel="noopener">
              Documentation
            </a>
          </>
        )}
      </CardItem>
    </Card>
  );
}
