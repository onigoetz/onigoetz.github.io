import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Technology from "../components/Technology";
import heroStyles from "../components/hero.module.css";
import Layout from "../components/Layout";

export default function BlogPostTemplate({
  data: { contentfulBlogPost: post }
}) {
  return (
    <Layout title={post.title}>
      {post.heroImage && (
        <div className={heroStyles.hero}>
          <Img
            className={heroStyles.heroImage}
            alt={post.title}
            sizes={post.heroImage.sizes}
          />
        </div>
      )}

      <article className="Post">
        <h1 className="Post--title">{post.title}</h1>
        <p>
          {<span className="Post--date">{post.publishDate}</span>}

          {post.technologies &&
            post.technologies.map(tag => <Technology technology={tag} />)}

          {post.tags &&
            post.tags.map(tag => (
              <span key={tag} className="Post--tag">
                {tag}
              </span>
            ))}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html
          }}
        />
      </article>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      tags
      technologies
      heroImage {
        title
        sizes(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulSizes_withWebp
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
