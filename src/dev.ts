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
import * as style from "./style.css";

const blogHeader = header({
  class: style.header.name
}, [

  div({
    class: style.title.name
  }, [
    p({}, [
      "aabccd021 blog"
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

const clsx = (classes: string[]) => classes.join(" ");

const page = html({
  lang: "en",
  class: style.html.name
}, [
  ...metas,
  a({
    class: clsx([
      style.skip.name,
      style.skipFocus.name
    ]),
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
          class: clsx([
            style.postlistLink.name, 
            style.a.name, 
            style.aVisited.name, 
            style.aActive.name, 
            style.aHover.name
          ]),
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

const htmlString = elementToString(page);

Object.values(style)
  .map((z) => z);


export default withHtmlLiveReload({
  fetch: async (request) => {

    const path = new URL(request.url).pathname;
    if (path === "/") {

      return new Response(`<!DOCTYPE html>${htmlString}`, {
        headers: {
          "Content-Type": "text/html"
        }
      });

    }

    if (path === "/style.css") {

      const styles = await import("./style.css.ts");

      const cssString = Object.values(styles)
        .map((z) => z.text)
        .join("\n");

      return new Response(cssString, {
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
