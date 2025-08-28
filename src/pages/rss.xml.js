export default function Rss() {
  return null;
}

Rss.getInitialProps = async function ({ res }) {
  if (!res || !res.write) {
    return {};
  }

  const getRssXml = require("../helpers/rss.mjs");

  res.setHeader("Content-Type", "text/xml");
  res.write(getRssXml());
  res.end();
};
