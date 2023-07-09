// example.ts
import { withHtmlLiveReload } from "./hot";
import { elementToString, h } from "./html";

const html = h('html', {}, [
  h('h1', {}, [
    'Hello, world! yo'
  ]),
])

const htmlString = `<!DOCTYPE html>\n${elementToString(html)}`

export default withHtmlLiveReload({
  fetch: () => {
    return new Response(htmlString, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
