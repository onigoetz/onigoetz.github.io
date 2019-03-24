import React from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { StaticQuery, graphql } from "gatsby";

export default function Blog() {

    return (
      <StaticQuery
    query={graphql`
      query AllBlogPosts {
        allContentfulBlogPost {
          nodes {
            slug,
            title,
            publishDate(formatString: "MMMM Do, YYYY"),
            description {
              description
            }
          }
        }
      }
    `} render={({allContentfulBlogPost: {nodes: posts}}) => {
      return <Layout title="Blog">
        {posts.map(p => (
          <Post key={p.title} post={p} />
        ))}
      </Layout>
    }} />

    );
}
