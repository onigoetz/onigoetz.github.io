import { marked } from "marked";
import blogPosts from "../../data/blogPost.json" assert { type: "json" };

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = "";
  let rssItemsXml = "";
  blogPosts.forEach((post) => {
    const postDate = Date.parse(post.publishDate);
    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.publishDate;
    }
    rssItemsXml += `
      <item>
        <title>${post.title}</title>
        <link>https://onigoetz.ch/blog/${post.slug}</link>
        <pubDate>${post.publishDate}</pubDate>
        <description>
        <![CDATA[${marked(post.body)}]]>
        </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

export default function getRssXml() {
  blogPosts.sort(
    (a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate),
  );

  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);
  return `<?xml version="1.0" ?>
  <rss version="2.0">
    <channel>
        <title>Blog by Stéphane Goetz</title>
        <link>https://onigoetz.ch</link>
        <description>A few articles about things</description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};
