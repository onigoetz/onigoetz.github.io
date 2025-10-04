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

function getFieldValue([key, value]) {
  return [key, value.fields ? value.fields : value];
}

function mapFields(item) {
  const itemEntries = Object.entries(item.fields ? item.fields : item);
  return Object.fromEntries(itemEntries.map(getFieldValue));
}

async function getContent() {
  console.log("> Starting import...");
  for (const type of types) {
    console.log("> Getting content for", type);
    const entries = await client.getEntries({ content_type: type });

    const mappedEntries = entries.items.map(mapFields);

    fs.writeFileSync(
      path.join(process.cwd(), "data", `${type}.json`),
      JSON.stringify(mappedEntries, null, 2),
    );
    console.log("> Content retrieved and written for", type);
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
  },
);
