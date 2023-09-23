module.exports = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {
    // Can't generate the RSS feed through this method
    delete defaultPathMap["/rss.xml"];

    // Remove the default dynamic route for blog posts
    delete defaultPathMap["/blog/[slug]"];

    return defaultPathMap;
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
