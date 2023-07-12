import { withHtmlLiveReload } from "./hot";
import { elementToString, h as tag } from "./html";

const html = tag('html', { lang: 'en', }, [
  tag('link', { href:"/favicon.ico", rel:"icon" }),
  tag('link', { href:"/favicon.svg", rel:"icon", type:"image/svg+xml" }),
  tag('link', { href:"/apple-touch-icon.png", rel:"apple-touch-icon" }),
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
