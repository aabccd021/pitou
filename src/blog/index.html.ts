import {
  classNameOf
} from "../cssUtil";
import {
  Env
} from "../env";
import {
  a,
  div,
  elementToString, h1, html, img, li, main, nav, picture, source, time, ul, header, p
} from "../html";


import {
  metas
} from "../meta";

import * as style from "../style";

const blogHeader = (env: Env) => header({
  class: classNameOf(style.header)
}, [

  div({
    class: classNameOf(style.title)
  }, [
    img({
      src: env.staticUrl("/logo.png"),
      width: "33"
    }),
    p({}, [
      "dvhero.blog"
    ])
  ]),

  nav({
    class: classNameOf(style.nav)
  }, [

    a({
      class: classNameOf(style.navItem),
      href: "/",
      "aria-current": "page"
    }, [
      "Home"
    ]),


    a({
      class: classNameOf(style.navItem),
      href: "/tags/"
    }, [
      "Tags"
    ]),

    a({
      class: classNameOf(style.navItem),
      href: "/about/"
    }, [
      "About Me"
    ]),


    a({
      class: classNameOf(style.navItem),
      href: "/feed/feed.xml",
      rel: "alternate",
      type: "application/rss+xml"
    }, [
      "RSS"
    ])

  ])

]);

const page = (env: Env) => html({
  lang: "en",
  class: classNameOf(style.html)
}, [
  ...metas(env),
  a({
    class: classNameOf(style.skip)
  }, [
    "Skip to main content"
  ]),
  blogHeader(env),
  main({
    id: "main",
    class: classNameOf(style.main)
  }, [
    h1({}, [
      "Posts"
    ]),
    ul({
      class: classNameOf(style.postlist)
    }, [
      li({
        class: classNameOf(style.postlistItem)
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
            class: classNameOf(style.postListItemImage),
            src: "/img/BMWTtZw5Gk-1200.svg",
            alt: "command to create new GitHub repository",
            decoding: "async",
            height: 630,
            width: 1200,
            loading: "lazy"
          })
        ]),

        a({
          class: classNameOf(style.postlistLink),
          href: "/blog/create-new-github-repository-from-cli-with-gh-command/"
        }, [
          "Create new GitHub repository from CLI with gh command"
        ]),

        time({
          class: classNameOf(style.postlistDate),
          datetime: "2023-02-05"
        }, [
          "5 February 2023"
        ])

      ])
    ])

  ])

]);


export const content = (env: Env) => {

  const elementHtmlString = elementToString(page(env));
  return `<!DOCTYPE html>${elementHtmlString}`;

};


