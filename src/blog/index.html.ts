import {
  a,
  div,
  elementToString, h1, html, img, li, main, nav, picture, source, time, ul, header, p
} from "../html";


import {
  metas
} from "../meta";

import * as style from "../style.css";

const blogHeader = header({
  class: style.header.name
}, [

  div({
    class: style.title.name
  }, [
    img({
      src: "/logo.png",
      width: "40rem"
    }),
    p({}, [
      "functionhero"
    ])
  ]),

  nav({
    class: style.nav.name
  }, [

    a({
      class: style.navItem.name,
      href: "/",
      "aria-current": "page"
    }, [
      "Home"
    ]),


    a({
      class: style.navItem.name,
      href: "/tags/"
    }, [
      "Tags"
    ]),

    a({
      class: style.navItem.name,
      href: "/about/"
    }, [
      "About Me"
    ]),


    a({
      class: style.navItem.name,
      href: "/feed/feed.xml",
      rel: "alternate",
      type: "application/rss+xml"
    }, [
      "RSS"
    ])

  ])

]);

const page = html({
  lang: "en",
  class: style.html.name
}, [
  ...metas,
  a({
    class: style.skip.name
  }, [
    "Skip to main content"
  ]),
  blogHeader,
  main({
    id: "main",
    class: style.main.name
  }, [
    h1({}, [
      "Posts"
    ]),
    ul({
      class: style.postlist.name
    }, [
      li({
        class: style.postlistItem.name
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
            class: style.postListItemImage.name,
            src: "/img/BMWTtZw5Gk-1200.svg",
            alt: "command to create new GitHub repository",
            decoding: "async",
            height: 630,
            width: 1200,
            loading: "lazy"
          })
        ]),

        a({
          class: style.postlistLink.name,
          href: "/blog/create-new-github-repository-from-cli-with-gh-command/"
        }, [
          "Create new GitHub repository from CLI with gh command"
        ]),

        time({
          class: style.postlistDate.name,
          datetime: "2023-02-05"
        }, [
          "5 February 2023"
        ])

      ])
    ])

  ])

]);

const elementHtmlString = elementToString(page);

const htmlString = `<!DOCTYPE html>${elementHtmlString}`;

process.stdout.write(htmlString);


