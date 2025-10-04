/* eslint-disable no-unused-vars */
import React from "react";
import Link from "next/link";
/* eslint-enable */

import "normalize.css/normalize.css";
import "../../css/base.css";
import "../../css/code.css";
import "../../css/layout.css";
import "../../css/technologies.css";

import { SiBluesky, SiGithub, SiLinkedin, SiX } from "react-icons/si";

import styles from "./Layout.module.css";
import ContentfulImage from "@components/ContentfulImage";
import { getMe } from "@data";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Onigoetz.ch",
  description:
    "My personal website, with my personal projects and a few articles.",
  authors: [{ name: "Stéphane Goetz" }],
  robots: "index, follow",
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon-16x16.png",
    apple: "/assets/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: "#e6fffe",
};

export default async function Layout({ children }) {
  const me = getMe();

  return (
    <html lang="en">
      <head>
        <title>Onigoetz.ch</title>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS for blog posts"
          href="https://www.onigoetz.ch/rss.xml"
        />
        <script
          async
          defer
          data-domain="onigoetz.ch"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </head>
      <body>
        <aside className={styles.aside}>
          <div className={styles.picture}>
            <ContentfulImage
              alt="Picture of Stéphane Goetz"
              src={me.image}
              width={193}
              height={173}
            />
          </div>

          <div className={styles.presentation}>
            <strong className={styles.title}>Stéphane Goetz</strong>
            <div className={styles.bio}>{me.shortBio}</div>
          </div>

          <ul className={styles.links}>
            <li>
              <Link href="/" className="Link">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="Link">
                Blog
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
              <SiGithub style={{ fill: "#181717", maxWidth: 50 }} />
            </a>
            <a
              href="https://bsky.app/profile/onigoetz.bsky.social"
              className="bluesky"
              title="Bluesky Profile"
              target="_blank"
              rel="noopener"
            >
              <SiBluesky style={{ fill: "#1DA1F2", maxWidth: 50 }} />
            </a>
            <a
              href="https://x.com/onigoetz"
              className="xsocial"
              title="X Profile"
              target="_blank"
              rel="noopener"
            >
              <SiX style={{ fill: "#000", maxWidth: 50 }} />
            </a>
            <a
              href="https://ch.linkedin.com/in/stephanegoetz"
              className="linkedin"
              title="LinkedIn profile"
              target="_blank"
              rel="noopener"
            >
              <SiLinkedin style={{ fill: "#1083fe", maxWidth: 50 }} />
            </a>
          </div>
        </aside>

        <div className={styles.content}>{children}</div>

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Onigoetz.ch
        </div>
      </body>
    </html>
  );
}
