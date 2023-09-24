import React from "react";
import Layout from "../components/Layout";
import getBadges from "../helpers/badges";
import { getPerson } from "../helpers/utils";

export default function Badges({ projects, me }) {
  return (
    <Layout title="Badges" me={me}>
      {projects.map((p) => {
        return (
          <div>
            <h2>{p.title}</h2>
            <pre>
              {p.badges
                .map((badge) => {
                  const img = `![${badge.title}](${badge.src})`;

                  return badge.url ? `[${img}](${badge.url})` : img;
                })
                .join("\n")}
              {p.moreBadges}
            </pre>
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const projects = require("../../data/projects.json").map((project) => ({
    title: project.title,
    badges: getBadges(project),
    moreBadges: project.badges || null,
  }));

  return {
    props: {
      projects,
      me: getPerson(),
    },
  };
}
