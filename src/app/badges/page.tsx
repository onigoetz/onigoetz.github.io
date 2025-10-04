import { getProjects } from "@data";
import getBadges from "@helpers/badges";

export default async function Page() {
  const projects = getProjects().map((project) => ({
    title: project.title,
    badges: getBadges(project),
    moreBadges: project.badges || null,
  }));

  return (
    <>
      {projects.map((p) => {
        return (
          <div key={p.title}>
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
    </>
  );
}
