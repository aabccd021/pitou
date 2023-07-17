import serveStatic from "serve-static-bun";
import {
  write
} from "./generate";

await write();

console.log("aab");

Bun.serve({
  development: true,
  fetch: serveStatic("result/public")
});
