export function getPerson() {
  const person = require("../../data/person.json")[0];

  return { image: person.image.computed, shortBio: person.shortBio };
}
