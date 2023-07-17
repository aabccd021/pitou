export const staticFiles = [
  "/index.html",
  "/style.css",
  "/logo.png"
] as const;

export const makeStaticUrl = <T extends string>(filesDef: readonly T[]) => (requestedUrl: T) => {

  const files: readonly string[] = filesDef;

  if (files.includes(requestedUrl)) {

    return requestedUrl;

  }

  if (files.includes(`${requestedUrl}index.html`)) {

    return requestedUrl;

  }

  throw new Error(`Unknown static file: ${requestedUrl}`);

};

export const staticUrl = makeStaticUrl(staticFiles);
