import { withHtmlLiveReload } from "./hot";
import { elementToString, html, link } from "./html";

const page = html({ lang: 'en', }, [
  link({ href:"/favicon.ico", rel:"icon" }),
  link({ href:"/favicon.svg", rel:"icon", type:"image/svg+xml" }),
  link({ href:"/apple-touch-icon.png", rel:"apple-touch-icon" }),
])

const htmlString = elementToString(page);

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
