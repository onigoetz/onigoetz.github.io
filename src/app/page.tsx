import { marked } from "marked";
import ProjectGrid from "@components/ProjectGrid";
import { getProjects } from "@data";

export const metadata = {
  title: "My Projects · Onigoetz.ch",
};

export default async function Page() {
  const projects = getProjects();
  projects.forEach((item) => {
    if (item.badges) {
      item.badges = marked(item.badges);
    }

    if (item.description) {
      item.description = marked(item.description);
    }
  });
  return (
    <>
      <h1>My Projects</h1>
      <ProjectGrid projects={projects} />
    </>
  );
}
