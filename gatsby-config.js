const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

const { CTF_SPACE_ID, CTF_CDA_TOKEN } = process.env;

module.exports = {
  plugins: [
    "gatsby-transformer-remark",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: CTF_SPACE_ID,
        accessToken: CTF_CDA_TOKEN
      }
    }
  ]
};
