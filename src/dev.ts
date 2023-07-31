import {
  css,
  html,
  makeDev
} from "./devUtil";


export default makeDev({
  "/": html(() => import("./blog/index.html")),
  "/style.css": css(() => import("./blog/style.css"))
});
