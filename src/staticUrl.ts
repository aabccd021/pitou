export const staticFiles = {
  indexHtml: "/index.html",
  styleCss: "/style.css"
} satisfies Record<string, string>;

export const makeStaticUrl = (staticFilesDef: Record<string, string>) => (requestedUrl: string) => {

  const files = Object.values(staticFilesDef);

  if (files.includes(requestedUrl)) {

    return requestedUrl;

  }

  if (files.includes(`${requestedUrl}index.html`)) {

    return requestedUrl;

  }

  throw new Error(`Unknown static file: ${requestedUrl}`);

};

export const staticUrl = makeStaticUrl(staticFiles);
