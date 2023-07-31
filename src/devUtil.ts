import serveStatic from "serve-static-bun";
import {
  withHtmlLiveReload
} from "./hot";

type ModuleImport = () => Promise<{ content: string }>;

interface Module {
  import: ModuleImport;
  options?: ResponseInit;
}

export const html = (imports: ModuleImport): Module => ({
  import: imports,
  options: {
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  }
});

export const css = (imports: ModuleImport): Module => ({
  import: imports,
  options: {
    headers: {
      "Content-Type": "text/css; charset=utf-8"
    }
  }
});


const makeReloadable = async (
  modules: Record<string, Module>,
  request: Request
): Promise<Response | undefined> => {

  const path = new URL(request.url).pathname;

  const module = modules[path];

  if (module === undefined) {

    return undefined;

  }

  const {
    content
  } = await module.import();

  return new Response(content, module.options);

};


export const makeDev = (modules: Record<string, Module>) => withHtmlLiveReload({
  development: true,
  fetch: async (request) => {

    const hotReloadable = await makeReloadable(modules, request);
    if (hotReloadable) {

      return hotReloadable;

    }
    return serveStatic("result/public")(request);

  }
});
