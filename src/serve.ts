import serveStatic from "serve-static-bun";

console.log("Serving at http://localhost:3000/");

Bun.serve({
  fetch: serveStatic("result/public")
});
