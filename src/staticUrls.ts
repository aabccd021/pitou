export const staticFiles = [
  "/index.html",
  "/style.css",
  "/logo.png"
] as const;

type StaticFiles = typeof staticFiles[number];

export const staticUrl = (requestedUrl: StaticFiles) => requestedUrl;


