import {
  elementToString, h
} from "./html";

import {
  withHtmlLiveReload
} from "./hot";
import {
  meta
} from "./meta";

const header = h("header", {}, [

  h("div", {
    class: "title"
  }, [
    h("p", {}, [
      "aabccd021 blog"
    ])
  ]),

  h("nav", {}, [

    h("a", {
      class: "nav-item",
      href: "/",
      "aria-current": "page"
    }, [
      "Home"
    ]),


    h("a", {
      class: "nav-item",
      href: "/tags/"
    }, [
      "Tags"
    ]),

    h("a", {
      class: "nav-item",
      href: "/about/"
    }, [
      "About Me"
    ]),


    h("a", {
      class: "nav-item",
      href: "/feed/feed.xml",
      rel: "alternate",
      type: "application/rss+xml"
    }, [
      "RSS"
    ])

  ])

]);

const page = h("html", {
  lang: "en"
}, [
  ...meta,
  h("a", {
    class: "skip"
  }, [
    "Skip to main content"
  ]),
  header,
  h("main", {
    id: "main"
  }, [
    h("h1", {}, [
      "Posts"
    ]),
    h("ul", {
      class: "postlist reversed"
    }, [
      h("li", {
        class: "postlist-item"
      }, [
        h("picture", {}, [
          h("source", {
            srcset: "/img/BMWTtZw5Gk-1200.avif 1200w",
            type: "image/avif"
          }),
          h("source", {
            srcset: "/img/BMWTtZw5Gk-1200.webp 1200w",
            type: "image/webp"
          }),
          h("img", {
            src: "/img/BMWTtZw5Gk-1200.svg",
            alt: "command to create new GitHub repository",
            decoding: "async",
            height: 630,
            width: 1200,
            loading: "lazy"
          })
        ]),

        h("a", {
          class: "postlist-link",
          href: "/blog/create-new-github-repository-from-cli-with-gh-command/"
        }, [
          "Create new GitHub repository from CLI with gh command"
        ]),

        h("time", {
          class: "postlist-date",
          datetime: "2023-02-05"
        }, [
          "5 February 2023"
        ])

      ])
    ])

  ])

]);

const htmlString = elementToString(page);

export default withHtmlLiveReload({
  fetch: () => {

    const responseStr = `<!DOCTYPE html>${htmlString}`;
    return new Response(
      responseStr, {
        headers: {
          "Content-Type": "text/html"
        }
      }
    );

  }
});
