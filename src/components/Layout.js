/* eslint-disable no-unused-vars */
import React from "react";
import Link from "next/link";
import Head from "next/head";
/* eslint-enable */

import GitHub from "../../public/assets/github.svg";
import Twitter from "../../public/assets/twitter.svg";
import Linkedin from "../../public/assets/linkedin.svg";

import styles from "./Layout.module.css";
import Img from "gatsby-image";

export default function Layout({ title, children, me }) {
  return (
    <>
      <Head>
        <title>{title ? `${title} · Onigoetz.ch` : `Onigoetz.ch`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="My personal website, with my personal projects and a few articles."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Stéphane Goetz" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS for blog posts"
          href="https://www.onigoetz.ch/rss.xml"
        />
      </Head>
      <aside className={styles.aside}>
        <Img
          className={styles.picture}
          alt="Picture of Stéphane Goetz"
          fluid={me.image}
          style={{ maxWidth: 300 }}
        />
        <strong className={styles.title}>Stéphane Goetz</strong>
        <p className={styles.bio}>{me.shortBio}</p>

        <div className={styles.container}>
          <ul>
            <li>
              <Link href="/">
                <a className="Link">Projects</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="Link">Blog</a>
              </Link>
            </li>
          </ul>

          <div className={styles.socialButtons}>
            <a
              href="https://github.com/onigoetz"
              className="github"
              title="Github Profile"
              target="_blank"
              rel="noopener"
            >
              <GitHub style={{ fill: "#181717", maxWidth: 50 }} />
            </a>
            <a
              href="https://twitter.com/onigoetz"
              className="twitter"
              title="Twitter Profile"
              target="_blank"
              rel="noopener"
            >
              <Twitter style={{ fill: "#1DA1F2", maxWidth: 50 }} />
            </a>
            <a
              href="https://ch.linkedin.com/in/stephanegoetz"
              className="linkedin"
              title="LinkedIn profile"
              target="_blank"
              rel="noopener"
            >
              <Linkedin style={{ fill: "#0077B5", maxWidth: 50 }} />
            </a>
          </div>
        </div>
      </aside>

      <div className={styles.content}>{children}</div>

      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Onigoetz.ch
      </div>
    </>
  );
};
