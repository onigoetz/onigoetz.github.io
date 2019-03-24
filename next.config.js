require("dotenv").config();

const webpack = require("webpack");

const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withImages(
  withCSS({
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));

      return config;
    },
    target: "serverless"
  })
);
