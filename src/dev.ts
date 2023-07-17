import serveStatic from "serve-static-bun";
import {
  withHtmlLiveReload
} from "./hot";

export default withHtmlLiveReload({
  development: true,
  fetch: async (request) => {

    const path = new URL(request.url).pathname;

    if (path === "/") {

      const index = await import("./blog/index.html");

      return new Response(index.content, {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      });

    }

    if (path === "/style.css") {

      const style = await import("./blog/style.css");

      return new Response(style.content, {
        headers: {
          "Content-Type": "text/css; charset=utf-8"
        }
      });

    }


    return serveStatic("result/public")(request);

  }
});
