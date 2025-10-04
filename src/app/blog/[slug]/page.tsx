import React from "react";
import ContentfulImage from "@components/ContentfulImage";

import Technology from "@components/Technology";
import Card, { CardItem } from "@components/Card";
import Date from "@components/Date";

import styles from "./page.module.css";
import { marked } from "marked";

import { HiOutlineTag } from "react-icons/hi2";
import { getPostBySlug, getPosts } from "@data";


export async function generateStaticParams() {
  const posts = getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return {
    title: `${post.title} · Onigoetz.ch`,
    description: post.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  post.body = await marked(post.body);

  return (
    <>
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
                  <HiOutlineTag
                    style={{
                      height: "1em",
                      width: "1em",
                      lineHeight: "1em",
                      display: "inline-block",
                      transform: "translate(.3em, .2em)",
                      color: "#555",
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
    </>
  );
}
