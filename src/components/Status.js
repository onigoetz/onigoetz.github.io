import { styled } from "linaria/react";
import React from "react";

const backgrounds = {
  active: "#5cb85c",
  wip: "#5bc0de",
  unmaintained: "#f0ad4e",
  abandoned: "#d9534f"
};

const colors = {
    active: "#fff",
    abandoned: "#fff"
};

const Badge = styled.span`
  padding: 0.3em 0.5em;
  border-radius: 5px;

  background: ${props => backgrounds[props.status]};
  color: ${props => colors[props.status] || "inherit"};
`;

export default function Status({ status }) {
  return <Badge status={status}>{status}</Badge>;
}
