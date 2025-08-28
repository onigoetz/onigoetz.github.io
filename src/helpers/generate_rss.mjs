import fs from "fs";
import getRssXML from "./rss.mjs";

fs.writeFileSync("out/rss.xml", getRssXML());
console.log("Finished writing rss.xml");
