const fs = require("fs");
const path = require("path");
const contentful = require("contentful");

require("dotenv").config();

const SPACE = process.env.CTF_SPACE_ID;
const TOKEN = process.env.CTF_CDA_TOKEN;

const client = contentful.createClient({
  space: SPACE,
  accessToken: TOKEN,
});

const types = ["blogPost", "projects", "person"];

const image = require("./image.js");

async function getFieldValue([key, value]) {
  if (key === "heroImage") {
    value.fields.computed = await image(value.fields, {
      maxWidth: 1180,
      background: "rgb:000000",
    });
  }

  if (key === "image") {
    value.fields.computed = await image(value.fields, {
      maxWidth: 208,
      background: "rgb:000000",
    });
  }

  return [key, value.fields ? value.fields : value];
}

// This whole thing can be removed with `Object.fromEntries`
// once Netlify moves their build environment to Node 12
async function mapFields(item) {
  const fields = await Promise.all(
    Object.entries(item.fields ? item.fields : item).map(getFieldValue)
  );

  const out = {};
  fields.forEach(([key, value]) => {
    out[key] = value;
  });

  return out;
}

async function getContent() {
  console.log("> Starting import...");
  for (const type of types) {
    console.log("> Getting content for", type);
    const entries = await client.getEntries({ content_type: type });

    fs.writeFileSync(
      path.join(process.cwd(), "data", `${type}.json`),
      JSON.stringify(await Promise.all(entries.items.map(mapFields)), null, 2)
    );
    console.log("> Content gotten and written for", type);
  }
  return true;
}

(async () => {
  await getContent();
})().then(
  () => {
    console.log("Done");
  },
  (error) => {
    console.error(error);
  }
);
