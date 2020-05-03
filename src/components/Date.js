import React from "react";
import styles from "./Date.module.css";

export default function Date({ children }) {
  return <span className={styles.element}>{children}</span>;
}
