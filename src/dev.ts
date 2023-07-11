import { withHtmlLiveReload } from "./hot";
import { elementToString, h } from "./html";

const html = h('html', { lang: 'en', }, [
  h('link', { href:"/favicon.ico", rel:"icon" }, undefined),
  h('link', { href:"/favicon.svg", rel:"icon", type:"image/svg+xml" }, undefined),
  h('link', { href:"/apple-touch-icon.png", rel:"apple-touch-icon" }, undefined),
])

const htmlString = elementToString(html);

export default withHtmlLiveReload({
  fetch: () => {
    const responseStr = `<!DOCTYPE html>${htmlString}`;
    console.log('');
    console.log('');
    console.log(responseStr);
    return new Response(responseStr, {
      headers: { "Content-Type": "text/html" },
    });
  },
});
