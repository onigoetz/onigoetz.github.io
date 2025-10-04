import Post from "@components/Post";
import { getPosts } from "@data";

import styles from "./page.module.css";

export const metadata = {
  title: "Blog · Onigoetz.ch",
};

export default async function Page() {
  const posts = getPosts();

  return (
    <div className={styles.container}>
      {posts.map((p) => (
        <Post key={p.title} post={p} />
      ))}
    </div>
  );
}
