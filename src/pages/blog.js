import React from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { getPerson } from "../helpers/utils";

export default function Blog({ posts, me }) {
  return (
    <Layout title="Blog" me={me}>
      {posts.map((p) => (
        <Post key={p.title} post={p} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const posts = require("../../data/blogPost.json")
    .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      publishDate: formatter.format(Date.parse(post.publishDate)),
    }));

  return {
    props: {
      posts,
      me: getPerson(),
    },
  };
}
