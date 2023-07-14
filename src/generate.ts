import {
  htmlString
} from "./blog/index.html.ts";

const files: Record<string, () => Promise<string>> = {
  "/index.html": () => Promise.resolve(htmlString),
  "/style.css": async () => {

    const styles = await import("./style.css.ts");
    return Object.values(styles)
      .map((z) => z.text)
      .join("\n");

  }
};

const outDir = "./public";

const writes = Object
  .entries(files)
  .map(async ([ path, content ]) => Bun.write(`${outDir}/${path}`, await content()));

export const write = () => Promise.all(writes);
