import React from "react";
import ContentfulImage from "../../components/ContentfulImage";

import Technology from "../../components/Technology";
import Layout from "../../components/Layout";
import Card, { CardItem } from "../../components/Card";
import Date from "../../components/Date";

import styles from "./[slug].module.css";
import { getPerson } from "../../helpers/utils";
import { marked } from "marked";

import Tag from "../../../public/assets/tag.svg";

export default function BlogPost({ post, me }) {
  return (
    <Layout title={post.title} me={me}>
      {post.heroImage && (
        <div className={styles.hero}>
          <div className={styles.heroImage}>
            <ContentfulImage
              alt={post.heroImage.description}
              src={post.heroImage.file.url}
              width={1180}
              height={
                (1180 / post.heroImage.file.details.image.height) *
                post.heroImage.file.details.image.width
              }
            />
          </div>
        </div>
      )}

      <Card>
        <CardItem>
          <h1>
            {post.title}{" "}
            {post.technologies &&
              post.technologies.map((tag) => (
                <Technology key={tag} technology={tag} />
              ))}
          </h1>
          <p>
            <Date>{post.publishDate}</Date>

            {post.tags &&
              post.tags.map((tag) => (
                <React.Fragment key={tag}>
                  <Tag
                    style={{
                      height: "1em",
                      width: "1em",
                      lineHeight: "1em",
                      display: "inline-block",
                      transform: "translate(.3em, .2em)",
                      fill: "#555",
                    }}
                  />
                  <span className={styles.tag}>{tag}</span>
                </React.Fragment>
              ))}
          </p>
        </CardItem>
        <CardItem>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </CardItem>
      </Card>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = require("../../../data/blogPost.json");

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const posts = require("../../../data/blogPost.json");
  const post = posts.filter((post) => post.slug === ctx.params.slug)[0];

  post.publishDate = formatter.format(global.Date.parse(post.publishDate));
  post.body = marked(post.body);

  return { props: { post, me: getPerson() } };
}
