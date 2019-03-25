import React from "react";
import { Link } from "gatsby"

import Card, { CardItem } from "../components/Card";
import Date from "./Date";

export default function Post({ post }) {
  return (
    <Card>
      <CardItem>
        <h2>
          <Link to={`blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <Date>{post.publishDate}</Date>
        <p>{post.description.description}</p>
      </CardItem>
    </Card>
  );
}
