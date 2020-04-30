module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
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
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
