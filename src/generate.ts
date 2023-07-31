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

if (typeof importResult.content !== "string") {

  throw new Error("exported object property `content` is not a string");

}

await Bun.write("result", importResult.content);
