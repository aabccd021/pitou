import serveStatic from "serve-static-bun";
import {
  withHtmlLiveReload
} from "./hot";

type ModuleImport<E> = () => Promise<{ content: (env: E) => string }>;

interface Module<E> {
  import: ModuleImport<E>;
  options?: ResponseInit;
}

export const html = <E>(imports: ModuleImport<E>): Module<E> => ({
  import: imports,
  options: {
    headers: {
      "Content-Type": "text/html; charset=utf-8"
    }
  }
});

export const css = <E>(imports: ModuleImport<E>): Module<E> => ({
  import: imports,
  options: {
    headers: {
      "Content-Type": "text/css; charset=utf-8"
    }
  }
});


const makeReloadable = async <E>(
  env: E,
  modules: Record<string, Module<E>>,
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

  return new Response(content(env), module.options);

};


export const makeDev = <E>(env: E, modules: Record<string, Module<E>>) => withHtmlLiveReload({
  development: true,
  fetch: async (request) => {

    const hotReloadable = await makeReloadable(env, modules, request);
    if (hotReloadable) {

      return hotReloadable;

    }
    return serveStatic("result/public")(request);

  }
});
