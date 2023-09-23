export function getPerson() {
  const person = require("../../data/person.json")[0];

  return { image: person.image.file.url, shortBio: person.shortBio };
}
