import React from "react";

export default function Technology({ technology }) {
  return (
    <i
      className={`technology technology-${technology}`}
      title={`made with ${technology}`}
    />
  );
}
