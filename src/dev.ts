import serveStatic from "serve-static-bun";
import {
  withHtmlLiveReload
} from "./hot";

interface Module {
  import: () => Promise<{ content: string }>;
  contentType: string;
}

const makeReloadable = (modules: Record<string, Module>) => async (request: Request): Promise<Response | undefined> => {

  const path = new URL(request.url).pathname;

  const module = modules[path];

  if (module === undefined) {

    return undefined;

  }

  const {
    content
  } = await module.import();

  return new Response(content, {
    headers: {
      "Content-Type": module.contentType
    }
  });

};

const appHotReloadable = makeReloadable({
  "/": {
    import: () => import("./blog/index.html"),
    contentType: "text/html; charset=utf-8"
  },
  "/style.css": {
    import: () => import("./blog/style.css"),
    contentType: "text/css; charset=utf-8"
  }
});


export default withHtmlLiveReload({
  development: true,
  fetch: async (request) => {

    const hotReloadable = await appHotReloadable(request);
    if (hotReloadable !== undefined) {

      return hotReloadable;

    }
    return serveStatic("result/public")(request);

  }
});
