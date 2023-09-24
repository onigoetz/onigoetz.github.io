import React from "react";

import Card, { CardItem } from "./Card";
import GitHubButton from "./GitHubButton";
import Technology from "./Technology";
import Status from "./Status";

import styles from "./Project.module.css";
import getBadges from "../helpers/badges";

export default function Project({ project }) {
  const [owner, repo] = (project.githubRepository || "/").split("/");

  const badges = getBadges(project);

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

        <div className={styles.badges}>
          {badges.map((badge) => {
            const img = (
              <img key={badge.title} alt={badge.title} src={badge.src} />
            );

            return (
              <>
                {badge.url ? (
                  <a key={badge.title} href={badge.url} target="_blank">
                    {img}
                  </a>
                ) : (
                  img
                )}{" "}
              </>
            );
          })}

          {project.badges && (
            <span dangerouslySetInnerHTML={{ __html: project.badges }} />
          )}
        </div>
      </CardItem>
      <CardItem>
        <div dangerouslySetInnerHTML={{ __html: project.description }} />
        {project.documentation && (
          <a href={project.documentation} target="_blank" rel="noopener">
            Documentation
          </a>
        )}
      </CardItem>
    </Card>
  );
}
