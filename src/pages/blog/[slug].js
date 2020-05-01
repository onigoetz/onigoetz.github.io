import React from "react";
import Img from "gatsby-image";

import Technology from "../../components/Technology";
import Layout from "../../components/Layout";
import Card, { CardItem } from "../../components/Card";
import Date from "../../components/Date";

import styles from "./[slug].module.css";
import {getPerson} from "../../helpers/utils";


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
          <h1>{post.title}</h1>
          <p>
            <Date>{post.publishDate}</Date>
            {post.technologies &&
              post.technologies.map((tag) => <Technology key={tag} technology={tag} />)}

            {post.tags &&
              post.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
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

  const posts = require("../../../data/blogPost.json");
  const post = posts.filter((post) => post.slug === ctx.query.slug)[0];

  post.body = marked(post.body);

  return { post, me: getPerson() };
};
