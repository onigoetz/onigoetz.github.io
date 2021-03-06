module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Can't generate the RSS feed through this method
    delete defaultPathMap["/rss.xml"];

    // Remove the default dynamic route for blog posts
    delete defaultPathMap["/blog/[slug]"];

    const blogPosts = require("./data/blogPost.json");
    const posts = {};
    blogPosts.forEach((post) => {
      posts[`/blog/${post.slug}`] = {
        page: "/blog/[slug]",
        query: { slug: post.slug },
      };
    });

    return { ...defaultPathMap, ...posts };
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
