import React from "react";
import styles from "./Card.module.css";

export default function Card({ children }) {
  return <article className={styles.container}>{children}</article>;
}

export function CardItem({ children }) {
  return <div className={styles.item}>{children}</div>;
}

export function CardHeader({ children, image }) {
  return (
    <div className={styles.header} style={{ backgroundImage: `url(${image}?h=200&q=75)`, backgroundSize: 'cover' }}>
      <div className={styles.headerBackground}>{children}</div>
    </div>
  );
}
