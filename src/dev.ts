import {
  elementToString, h
} from "./html";

import {
  withHtmlLiveReload
} from "./hot";
import {
  meta
} from "./meta";

const page = h("html", {
  lang: "en"
}, [
  ...meta,
  h("a", {
    class: "skip"
  }, [
    "Skip to main content"
  ]),
  h("header", {}, [

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
      }, [])
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
