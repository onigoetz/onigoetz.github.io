import React from "react";
import Img from "gatsby-image";

import Technology from "../../components/Technology";
import Layout from "../../components/Layout";
import Card, { CardItem } from "../../components/Card";
import Date from "../../components/Date";

import styles from "./[slug].module.css";
import { getPerson } from "../../helpers/utils";

import Tag from "../../../public/assets/tag.svg";

export default function BlogPost({ post, me }) {
  return (
    <Layout title={post.title} me={me}>
      {post.heroImage && (
        <div className={styles.hero}>
          <Img
            className={styles.heroImage}
            alt={post.heroImage.description}
            fluid={post.heroImage.computed}
          />
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

BlogPost.getInitialProps = async (ctx) => {
  const marked = require("marked");
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const posts = require("../../../data/blogPost.json");
  const post = posts.filter((post) => post.slug === ctx.query.slug)[0];

  post.publishDate = formatter.format(global.Date.parse(post.publishDate));
  post.body = marked(post.body);

  return { post, me: getPerson() };
};
