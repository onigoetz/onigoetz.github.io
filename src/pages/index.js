import React from "react";
import Layout from "../components/Layout";
import ProjectGrid from "../components/ProjectGrid";

export default function Projects({ projects }) {
  return (
    <Layout title="Blog">
      <h1>My Projects</h1>
      <ProjectGrid projects={projects} />
    </Layout>
  );
}

Projects.getInitialProps = async (ctx) => {
  const projects = require("../../data/projects.json");

  const marked = require("marked");
  projects.forEach((item) => {
    if (item.badges) {
      item.badges = marked(item.badges);
    }
  });

  return { projects };
};
