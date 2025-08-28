import React from "react";
import Layout from "../components/Layout";
import ProjectGrid from "../components/ProjectGrid";
import { getPerson } from "../helpers/utils";

import { marked } from "marked";

export default function Projects({ projects, me }) {
  return (
    <Layout title="My Projects" me={me}>
      <h1>My Projects</h1>
      <ProjectGrid projects={projects} />
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = require("../../data/projects.json");
  projects.forEach((item) => {
    if (item.badges) {
      item.badges = marked(item.badges);
    }

    if (item.description) {
      item.description = marked(item.description);
    }
  });

  return { props: { projects, me: getPerson() } };
}
