import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { styled } from "linaria/react";

import Technology from "../components/Technology";
import Layout from "../components/Layout";
import Card, { CardItem } from "../components/Card";
import Date from "../components/Date";

const Tag = styled.span`
  margin-left: 0.5em;
`;

const Hero = styled.div`
  position: relative;
  background: #000;
  color: #fff;
  text-align: center;
`
  /*
  Ensure golden ratio for the hero size while limiting it to some extend to
  the viewport width
  */
const HeroImage = styled(Img)`
  height: 61.8vh;
  max-height: 400px;
  margin: -30px -30px 30px -30px;
`

export default function BlogPostTemplate({
  data: { contentfulBlogPost: post }
}) {
  return (
    <Layout title={post.title}>
      {post.heroImage && (
        <Hero>
          <HeroImage
            alt={post.title}
            sizes={post.heroImage.sizes}
          />
        </Hero>
      )}

      <Card>
        <CardItem>
          <h1>{post.title}</h1>
          <p>
            <Date>{post.publishDate}</Date>
            {post.technologies &&
              post.technologies.map(tag => <Technology technology={tag} />)}

            {post.tags && post.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
          </p>
        </CardItem>
        <CardItem>
          <div
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html
            }}
          />
        </CardItem>
      </Card>
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
