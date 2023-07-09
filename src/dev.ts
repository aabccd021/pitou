// example.ts
import { withHtmlLiveReload } from "./hot";

export default withHtmlLiveReload({
  fetch: () => {
    return new Response("<div>hell wor</div>", {
      headers: { "Content-Type": "text/html" },
    });
  },
});
