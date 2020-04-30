import React from "react";
import styles from "./Card.module.css";

export default function Card({ children }) {
  return <article className={styles.container}>{children}</article>;
}

export function CardItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}
