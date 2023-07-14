Object.values(style)
  .map((z) => z);


export default withHtmlLiveReload({
  fetch: async (request) => {

    const path = new URL(request.url).pathname;

    console.log(path);

    if (path === "/") {

      return new Response(, {
        headers: {
          "Content-Type": "text/html"
        }
      });

    }

    if (path === "/style.css") {

      const styles = await import("./style.css.ts");

      const cssString = Object.values(styles)
        .map((z) => z.text)
        .join("\n");

      return new Response(cssString, {
        headers: {
          "Content-Type": "text/css"
        }
      });

    }

    const localFile = Bun.file(import.meta.dir + path);

    console.log(localFile);

    if (localFile.size > 0) {

      return new Response(localFile.stream());

    }

    return new Response("Not found", {
      status: 404
    });

  }
});
