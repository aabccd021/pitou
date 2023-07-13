import type * as CSS from "csstype";
import {
  mapValues
} from "lodash";
import {
  createHash
} from "node:crypto";

export interface compiledClass {
  name: string;
  text: string;
}

export interface ClassSpec {
  properties: CSS.StandardPropertiesHyphen;
  selector?: CSS.Pseudos
}

export const compileClass = (spec: ClassSpec) => {

  const properties = Object
    .entries(spec.properties)
    .map(([ key, value ]) => `\n  ${key}: ${value};`)
    .sort()
    .join("");

  const hash = createHash("md5")
    .update(properties)
    .digest("hex");

  const name = `gen-${hash}`;
  const selector = spec.selector ?? "";

  return {
    name,
    text: `.${name}${selector} {${properties}\n}`
  };

};

const textColor = "#ddc7a1";
const textColorLink = "#7daea3";
const textColorLinkActive = "#ea6962";
const textColorLinkVisited = "#d3869b";
const backgroundColor = "#1d2021";

const classes = {

  html: {
    properties: {
      "max-width": "40em",
      "font-family": "-apple-system, system-ui, sans-serif",
      "background-color": backgroundColor,
      color: textColor,
      margin: "0 auto",
      padding: "0"
    }
  },

  header: {
    properties: {
      "border-bottom": "1px dashed",
      "flex-wrap": "wrap",
      "justify-content": "center",
      "align-items": "center",
      gap: "0 5em",
      margin: 0,
      padding: ".5em",
      display: "flex"
    }
  },

  main: {
    properties: {
      padding: "1rem 0"
    }
  },

  title: {
    properties: {
      "flex-wrap": "wrap",
      "align-items": "center",
      gap: "1em .8em",
      margin: 0,
      padding: 0,
      "font-size": "1.3em",
      "font-weight": 900,
      "line-height": 1,
      display: "flex"
    }
  },

  nav: {
    properties: {
      gap: "1em",
      margin: 0,
      padding: "1em 0",
      display: "flex"
    }
  },

  navItem: {
    properties: {
      display: "inline-block"
    }
  },

  img: {
    properties: {
      "object-fit": "contain",
      width: "100%",
      height: "auto",
      border: "1px solid #7c6f64",
      margin: "1em 0",
      display: "block"
    }
  },

  postlist: {
    properties: {
      padding: 0,
      "list-style": "none"
    }
  },

  postlistItem: {
    properties: {
      "margin-bottom": "4em"
    }
  },

  postlistDate: {
    properties: {
      color: textColor,
      "word-spacing": "-.5px",
      "font-size": ".8125em",
      display: "block"
    }
  },

  postlistLink: {
    properties: {
      "text-underline-position": "from-font",
      "text-underline-offset": 0,
      "font-size": "1.1875em",
      "font-weight": 700,
      "line-height": 1.5,
      "text-decoration-thickness": "1px",
      display: "block"
    }
  },

  skip: {
    properties: {
      width: "1px",
      height: "1px",
      position: "absolute",
      top: "auto",
      left: "-10000px",
      overflow: "hidden"
    }
  },

  postListItemImage: {
    properties: {
      "object-fit": "contain",
      width: "382px",
      height: "200px",
      margin: 0
    }
  }

} satisfies Record<string, ClassSpec>;

export const style = mapValues(classes, (a) => compileClass(a));
