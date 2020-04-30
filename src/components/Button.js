import React from "react";
import styles from "./Button.module.css";

export function Button({ variant, children }) {
  return (
    <span className={`${styles.button} ${variant ?? styles.variant}`}>
      {children}
    </span>
  );
}
