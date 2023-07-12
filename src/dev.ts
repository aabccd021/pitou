import { elementToString, h } from "./html";

import { withHtmlLiveReload } from "./hot";

const page = h("html", { lang: "en" }, [
  h("link", {
    href: "/favicon.ico",
    rel: "icon"
  }),
  h("link", {
    href: "/favicon.svg",
    rel: "icon",
    type: "image/svg+xml"
  }),
  h("link", {
    href: "/apple-touch-icon.png",
    rel: "apple-touch-icon"
  }),
  h("meta", { charset: "utf-8" }),
  h("meta", {
    content: "IE:edge",
    "http-equiv": "X-UA-Compatible"
  }),
  h("meta", {
    content: "width:device-width,initial-scale:1",
    name: "viewport"
  }),
  h("title", {}, ["aabccd021 blog"]),
  h("meta", {
    content: "Muhamad Abdurahman",
    name: "author"
  }),
  h("meta", {
    content: "aabccd021 blog",
    name: "title"
  }),
  h("meta", {
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    name: "description"
  }),
  h("meta", {
    content: "eleventy",
    name: "generator"
  }),
  h("meta", {
    content: "website",
    property: "og:type"
  }),
  h("meta", {
    content: "https://aabccd021.github.io/",
    property: "og:url"
  }),
  h("meta", {
    content: "en_US",
    property: "og:locale"
  }),
  h("meta", {
    content: "aabccd021 blog",
    property: "og:title"
  }),
  h("meta", {
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    property: "og:description"
  }),
  h("meta", {
    content: "https://aabccd021.github.io/img/banner.webp'",
    property: "og:image"
  }),
  h("meta", {
    content: "summary",
    name: "twitter:card"
  }),
  h("meta", {
    content: "https://aabccd021.github.io/",
    name: "twitter:url"
  }),
  h("meta", {
    content: "aabccd021 blog",
    name: "twitter:title"
  }),
  h("meta", {
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    name: "twitter:description"
  }),
  h("meta", {
    content: "https://aabccd021.github.io/img/banner.webp",
    name: "twitter:image"
  }),
  h("link", { href: "https://aabccd021.github.io/ rel:canonical" }),
  h("meta", {
    content: "aabccd021 blog",
    property: "og:site_name"
  })
]);

const htmlString = elementToString(page);

export default withHtmlLiveReload({
  fetch: () => {

    const responseStr = `<!DOCTYPE html>${htmlString}`;
    return new Response(
      responseStr, { headers: { "Content-Type": "text/html" } }
    );

  }
});
