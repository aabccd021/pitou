import {
  Env
} from "./env";

const pathToGenerate = process.env["PATH_TO_GENERATE"];

if (!pathToGenerate) {

  throw new Error("PATH_TO_GENERATE is not set");

}

const importResult: unknown = await import(pathToGenerate);

if (typeof importResult !== "object") {

  throw new Error("importResult is not an object");

}

if (importResult === null) {

  throw new Error("importResult is null");

}

if (!("content" in importResult)) {

  throw new Error("exported object does not have property `content`");

}

if (typeof importResult.content !== "function") {

  throw new Error("exported object property `content` is not a function");

}

export const env: Env = {
  staticUrl: (requestedUrl) => {

    if (Bun.file(`./public/${requestedUrl}`).size > 0) {

      return requestedUrl;

    }

    if (Bun.file(`./public/${requestedUrl}index.html`).size > 0) {

      return requestedUrl;

    }

    throw new Error(`Unknown static url: ${requestedUrl}`);

  }
};

const content: unknown = importResult.content(env);

if (typeof content !== "string") {

  throw new Error("exported object property `content` is not a string");

}

await Bun.write("result", content);
