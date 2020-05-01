import React from "react";
import Layout from "../components/Layout";
import ProjectGrid from "../components/ProjectGrid";
import { getPerson } from "../helpers/utils";

export default function Projects({ projects, me }) {
  return (
    <Layout title="My Projects" me={me}>
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

    if (item.description) {
      item.description = marked(item.description);
    }
  });

  return { projects, me: getPerson() };
};
