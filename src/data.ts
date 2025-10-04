export interface Me {
  image: string;
  shortBio: string;
}

export function getMe(): Me {
  const person = require("../data/person.json")[0];

  return { image: person.image.file.url, shortBio: person.shortBio };
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export interface PostExcerpt {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  heroImage?: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export function getPosts(): PostExcerpt[] {
  return require("../data/blogPost.json")
    .sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate))
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      publishDate: formatter.format(Date.parse(post.publishDate)),
      heroImage: post.heroImage,
    }));
}

export interface FullPost extends PostExcerpt {
  body: string;
  tags: string[];
  technologies: string[];
}

export function getPostBySlug(slug: string): FullPost {
  const post = require("../data/blogPost.json").find(
    (post) => post.slug === slug
  );

  if (!post) {
    throw new Error(`Post with slug '${slug}' not found.`);
  }

  post.publishDate = formatter.format(global.Date.parse(post.publishDate));

  return post;
}

export function getProjects() {
  return require("../data/projects.json");
}
