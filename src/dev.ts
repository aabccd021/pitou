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
