import serveStatic from "serve-static-bun";

console.log("Serving on http://localhost:3000");

Bun.serve({
  development: true,
  fetch: serveStatic("result/public")
});
