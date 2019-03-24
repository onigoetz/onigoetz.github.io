import React from "react";
import { Link } from "gatsby"

export default function Post({ post }) {
  return (
    <article className="Post">
      <h2 className="Post--title">
        <Link to={`blog/${post.slug}`}>{post.title}</Link>
      </h2>
      {<span className="Post--date">{post.publishDate}</span>}
      <p>{post.description.description}</p>
    </article>
  );
}
