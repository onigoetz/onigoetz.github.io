import React from "react";
import Layout from "../components/Layout";
import ProjectGrid from "../components/ProjectGrid";

import { StaticQuery, graphql } from "gatsby";

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
            <ProjectGrid projects={projects} />
          </Layout>
        );
      }}
    />
  );
}
