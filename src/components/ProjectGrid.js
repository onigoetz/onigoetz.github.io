import React, { useState } from "react";

import Project from "./Project";
import Card, { CardItem } from "./Card";
import styles from "./ProjectGrid.module.css";

const order = {
  active: 1,
  wip: 2,
  experiment: 3,
  unmaintained: 4,
  abandoned: 5,
};

const titles = {
  active: "Active",
  wip: "Work In Progress",
  experiment: "Experiment",
  unmaintained: "Unmaintained",
  abandoned: "Abandoned",
};

export default function ProjectGrid({ projects }) {
  const [visibleStatus, setStatusVisibility] = useState({
    active: true,
    unmaintained: false,
    wip: false,
    experiment: false,
    abandoned: false,
  });

  const visibleProjects = projects
    .filter((project) => visibleStatus[project.status])
    .sort((a, b) => order[a.status] - order[b.status] || a.name - b.name);

  return (
    <>
      <Card>
        <CardItem>
          <span className={styles.count}>
            {visibleProjects.length} / {projects.length} projects visible
          </span>

          {Object.keys(order)
            .filter(
              (status) =>
                projects.filter((project) => project.status == status).length
            )
            .map((status) => (
              <label key={status} className={styles.status}>
                <input
                  type="checkbox"
                  checked={visibleStatus[status]}
                  onChange={(event) =>
                    setStatusVisibility({
                      ...visibleStatus,
                      [status]: event.target.checked,
                    })
                  }
                />
                <span>{titles[status]}</span>
              </label>
            ))}
        </CardItem>
      </Card>
      <div className={styles.container}>
        {visibleProjects.map((p) => (
          <Project key={p.title} project={p} />
        ))}
      </div>
    </>
  );
}
