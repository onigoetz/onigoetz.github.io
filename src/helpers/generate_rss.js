const fs = require("fs");
const getRssXML = require("./rss.js");

fs.writeFileSync("out/rss.xml", getRssXML());
console.log("Finished writing rss.xml");
