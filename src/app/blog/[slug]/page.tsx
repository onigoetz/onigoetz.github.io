import React from "react";
import { Metadata } from "next";
import { HiOutlineTag } from "react-icons/hi2";

import { getPostBySlug, getPosts } from "@data";
import ContentfulImage from "@components/ContentfulImage";
import Technology from "@components/Technology";
import Card, { CardItem } from "@components/Card";
import Date from "@components/Date";

import styles from "./page.module.css";
import Markdown from "@components/Markdown";

export async function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const description = post.description;
  const title = `${post.title} · Onigoetz.ch`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://www.onigoetz.ch",
      siteName: "Onigoetz.ch",
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@onigoetz",
    },
  };

  if (post.heroImage) {
    metadata.openGraph!.images = [
      {
        url: `https:${post.heroImage.file.url}`,
        width: post.heroImage.file.details.image.width,
        height: post.heroImage.file.details.image.height,
        alt: post.heroImage.description,
      },
    ];
    metadata.twitter!.images = [`https:${post.heroImage.file.url}`];
  }

  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
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
          <div>
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
          </div>
        </CardItem>
        <CardItem>
          <div className="s-content">
            <Markdown content={post.body} />
          </div>
        </CardItem>
      </Card>
    </>
  );
}
