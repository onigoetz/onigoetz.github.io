import React from "react";
import styles from "./Status.module.css";

const titles = {
  active: "Active",
  wip: "Work In Progress",
  experiment: "Experiment",
  unmaintained: "Unmaintained",
  abandoned: "Abandoned",
};

export default function Status({ status }) {
  return (
    <div className={`${styles.element} ${styles[status]}`}>
      {titles[status]}
    </div>
  );
}
