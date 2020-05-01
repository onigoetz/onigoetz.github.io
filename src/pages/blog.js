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

Blog.getInitialProps = async (ctx) => {
  const posts = require("../../data/blogPost.json");
  return {
    posts: posts.map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      publishDate: post.publishDate,
    })),
    me: getPerson(),
  };
};
