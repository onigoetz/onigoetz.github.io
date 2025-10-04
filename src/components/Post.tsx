import React from "react";
import Link from "next/link";

import { PostExcerpt } from "@data";

import Card, { CardItem, CardHeader } from "@components/Card";
import Date from "./Date";

interface PostProps {
  post: PostExcerpt;
}

export default function Post({ post }: PostProps) {
  return (
    <Card>
      <CardHeader image={post.heroImage?.file.url}>
        <h2>
          <Link href={`blog/[slug]`} as={`blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
      </CardHeader>
      <CardItem>
        <Date>{post.publishDate}</Date>
        <p>{post.description}</p>
      </CardItem>
    </Card>
  );
}
