import {
  a,
  div,
  elementToString, h1, html, img, li, main, nav, picture, source, time, ul, header, p
} from "./html";

import {
  withHtmlLiveReload
} from "./hot";
import {
  metas
} from "./meta";

const blogHeader = header({}, [

  div({
    class: "title"
  }, [
    p({}, [
      "aabccd021 blog"
    ])
  ]),

  nav({}, [

    a({
      class: "nav-item",
      href: "/",
      "aria-current": "page"
    }, [
      "Home"
    ]),


    a({
      class: "nav-item",
      href: "/tags/"
    }, [
      "Tags"
    ]),

    a({
      class: "nav-item",
      href: "/about/"
    }, [
      "About Me"
    ]),


    a({
      class: "nav-item",
      href: "/feed/feed.xml",
      rel: "alternate",
      type: "application/rss+xml"
    }, [
      "RSS"
    ])

  ])

]);

const page = html({
  lang: "en"
}, [
  ...metas,
  a({
    class: "skip"
  }, [
    "Skip to main content"
  ]),
  blogHeader,
  main({
    id: "main"
  }, [
    h1({}, [
      "Posts"
    ]),
    ul({
      class: "postlist reversed"
    }, [
      li({
        class: "postlist-item"
      }, [
        picture({}, [
          source({
            srcset: "/img/BMWTtZw5Gk-1200.avif 1200w",
            type: "image/avif"
          }),
          source({
            srcset: "/img/BMWTtZw5Gk-1200.webp 1200w",
            type: "image/webp"
          }),
          img({
            src: "/img/BMWTtZw5Gk-1200.svg",
            alt: "command to create new GitHub repository",
            decoding: "async",
            height: 630,
            width: 1200,
            loading: "lazy"
          })
        ]),

        a({
          class: "postlist-link",
          href: "/blog/create-new-github-repository-from-cli-with-gh-command/"
        }, [
          "Create new GitHub repository from CLI with gh command"
        ]),

        time({
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
  fetch: (request) => {

    const path = new URL(request.url).pathname;
    if (path === "/") {

      return new Response(`<!DOCTYPE html>${htmlString}`, {
        headers: {
          "Content-Type": "text/html"
        }
      });

    }

    if (path === "/style.css") {

      return new Response(`
html {
  max-width: 40em;
  font-family:  -apple-system, system-ui, sans-serif;
  background-color: #1d2021;
  color: #ddc7a1;
  margin: 0 auto;
  padding: 0
}
                          `, {
        headers: {
          "Content-Type": "text/css"
        }
      });

    }

    return new Response("Not found", {
      status: 404
    });

  }
});
