import Post from "@components/Post";
import { getPosts } from "@data";

export const metadata = {
  title: "Blog · Onigoetz.ch",
};

export default async function Page() {
  const posts = getPosts();

  return (
    <>
      {posts.map((p) => (
        <Post key={p.title} post={p} />
      ))}
    </>
  );
}
