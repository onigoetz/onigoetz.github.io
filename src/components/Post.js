import React from "react";
import { Link } from "gatsby"

export default function Post({ post }) {
  return (
    <article className="post">
      <h2>
        <Link to={`blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {<span className="date">{post.publishDate}</span>}
      <p>{post.description.description}</p>
    </article>
  );
}
