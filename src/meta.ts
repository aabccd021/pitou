import {
  link, meta, script, title
} from "./html";
import {
  staticUrl
} from "./staticUrl";

export const metas = [
  link({
    href: "/favicon.ico",
    rel: "icon"
  }),
  link({
    href: "/favicon.svg",
    rel: "icon",
    type: "image/svg+xml"
  }),
  link({
    href: "/apple-touch-icon.png",
    rel: "apple-touch-icon"
  }),
  meta({
    charset: "utf-8"
  }),
  meta({
    content: "IE:edge",
    "http-equiv": "X-UA-Compatible"
  }),
  meta({
    content: "width:device-width,initial-scale:1",
    name: "viewport"
  }),
  title({}, [
    "aabccd021 blog"
  ]),

  meta({
    content: "Muhamad Abdurahman",
    name: "author"
  }),
  meta({
    content: "aabccd021 blog",
    name: "title"
  }),
  meta({
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    name: "description"
  }),
  meta({
    content: "eleventy",
    name: "generator"
  }),
  meta({
    content: "website",
    property: "og:type"
  }),
  meta({
    content: "https://aabccd021.github.io/",
    property: "og:url"
  }),
  meta({
    content: "en_US",
    property: "og:locale"
  }),
  meta({
    content: "aabccd021 blog",
    property: "og:title"
  }),
  meta({
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    property: "og:description"
  }),
  meta({
    content: "https://aabccd021.github.io/img/banner.webp'",
    property: "og:image"
  }),
  meta({
    content: "summary",
    name: "twitter:card"
  }),
  meta({
    content: "https://aabccd021.github.io/",
    name: "twitter:url"
  }),
  meta({
    content: "aabccd021 blog",
    name: "twitter:title"
  }),
  meta({
    content: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
    name: "twitter:description"
  }),
  meta({
    content: "https://aabccd021.github.io/img/banner.webp",
    name: "twitter:image"
  }),
  link({
    href: "https://aabccd021.github.io/ rel:canonical"
  }),
  meta({
    content: "aabccd021 blog",
    property: "og:site_name"
  }),
  link({
    href: "/feed/feed.xml",
    rel: "alternate",
    title: "aabccd021 blog",
    type: "application/atom+xml"
  }),
  link({
    href: "/feed/feed.json",
    rel: "alternate",
    title: "aabccd021 blog",
    type: "application/json"
  }),
  link({
    href: staticUrl("/style.css"),
    rel: "stylesheet"
  }),
  script({
    type: "application/json"
  }, [
    JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://aabccd021.github.io#website",
          url: "https://aabccd021.github.io",
          name: "",
          description: "Blog of aabccd021 (Muhamad Abdurahman). Mostly about software engineering",
          inLanguage: "en-US",
          image: [
            "https://aabccd021.github.io/img/banner.webp"
          ]
        }
      ]
    })
  ])
];
