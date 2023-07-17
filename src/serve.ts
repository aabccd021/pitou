import serveStatic from "serve-static-bun";
import {
  withHtmlLiveReload
} from "./hot";

console.log("Serving on http://localhost:3000");

export default withHtmlLiveReload({
  development: true,
  fetch: (req) => {
    serveStatic("result/public")(req)
  }
});
