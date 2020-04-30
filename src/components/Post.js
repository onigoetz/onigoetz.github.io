import React from "react";
import Link from "next/link";

import Card, { CardItem } from "../components/Card";
import Date from "./Date";

export default function Post({ post }) {
  return (
    <Card>
      <CardItem>
        <h2>
          <Link href={`blog/[slug]`} as={`blog/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h2>
        <Date>{post.publishDate}</Date>
        <p>{post.description}</p>
      </CardItem>
    </Card>
  );
}
