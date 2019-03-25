import React from "react";
import Layout from "../components/Layout";
import Project from "../components/Project";
import { styled } from "linaria/react";

import { StaticQuery, graphql } from "gatsby";

const ProjectGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export default function Projects() {
  return (
    <StaticQuery
      query={graphql`
        query AllProjects {
          allContentfulProjects {
            nodes {
              title
              status
              githubRepository
              technologies
              description
              badges {
                childMarkdownRemark {
                  html
                }
              }
              url
              documentation
            }
          }
        }
      `}
      render={({ allContentfulProjects: { nodes: projects } }) => {
        return (
          <Layout title="Blog">
            <ProjectGrid>
              {projects.map(p => (
                <Project key={p.title} project={p} />
              ))}
            </ProjectGrid>
          </Layout>
        );
      }}
    />
  );
}
