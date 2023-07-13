import type * as CSS from "csstype";
import {
  createHash
} from "node:crypto";

interface CompiledCls {
  name: string;
  text: string;
}

const mkPropertiesStr = (properties: CSS.StandardPropertiesHyphen): string => {

  const propertiesStr = Object
    .entries(properties)
    .map(([ key, value ]) => `\n  ${key}: ${value};`)
    .sort()
    .join("");

  return `{${propertiesStr}\n}`;

};

const cls = (properties: CSS.StandardPropertiesHyphen): CompiledCls => {

  const propertiesStr = mkPropertiesStr(properties);

  const hash = createHash("md5")
    .update(propertiesStr)
    .digest("hex");

  const name = `gen-${hash}`;

  return {
    name,
    text: `.${name} ${propertiesStr}`
  };

};

const pcls = (selectorProperties: Partial<Record<CSS.Pseudos | "", CSS.StandardPropertiesHyphen>>): CompiledCls => {

  const selectorPropertiesStr = Object
    .entries(selectorProperties)
    .map(([ selector, properties ]) => {

      const propertiesStr = mkPropertiesStr(properties);
      return `${selector} ${propertiesStr}`;

    });

  const hash = createHash("md5")
    .update(selectorPropertiesStr.join(""))
    .digest("hex");

  const name = `gen-${hash}`;

  return {
    name,
    text: selectorPropertiesStr
      .map((propertiesStr) => `.${name}${propertiesStr}`)
      .join("\n")
  };

};


const textColor = "#ddc7a1";
const textColorLink = "#7daea3";
const textColorLinkActive = "#ea6962";
const textColorLinkVisited = "#d3869b";
const backgroundColor = "#1d2021";
const lineColor = "#7c6f64";

export const html = cls({
  "max-width": "40em",
  "font-family": "-apple-system, system-ui, sans-serif",
  "background-color": backgroundColor,
  color: textColor,
  margin: "0 auto",
  padding: "0"
});

export const header = cls({
  "border-bottom": "1px dashed",
  "flex-wrap": "wrap",
  "justify-content": "center",
  "align-items": "center",
  gap: "0 5em",
  margin: 0,
  padding: ".5em",
  display: "flex"
});

export const main = cls({
  padding: "1rem 0"
});

export const title = cls({
  "flex-wrap": "wrap",
  "align-items": "center",
  gap: "1em .8em",
  margin: 0,
  padding: 0,
  "font-size": "1.3em",
  "font-weight": 900,
  "line-height": 1,
  display: "flex"
});

export const nav = cls({
  gap: "1em",
  margin: 0,
  padding: "1em 0",
  display: "flex"
});

export const navItem = cls({
  display: "inline-block"
});

export const img = cls({
  "object-fit": "contain",
  width: "100%",
  height: "auto",
  border: `1px solid ${lineColor}`,
  margin: "1em 0",
  display: "block"
});

export const postlist = cls({
  padding: 0,
  "list-style": "none"
});

export const postlistItem = cls({
  "margin-bottom": "4em"
});

export const postlistDate = cls({
  color: textColor,
  "word-spacing": "-.5px",
  "font-size": ".8125em",
  display: "block"
});


export const postListItemImage = cls({
  "object-fit": "contain",
  width: "382px",
  height: "200px",
  margin: 0
});

export const postlistLink = pcls({
  "": {
    color: textColorLink,
    "text-underline-offset": ".3em",
    "margin-bottom": ".3em",
    "text-decoration-color": lineColor,
    "text-underline-position": "from-font",
    "font-size": "1.1875em",
    "font-weight": 700,
    "line-height": 1.5,
    "text-decoration-thickness": "1px",
    display: "block"
  },
  ":visited": {
    color: textColorLinkVisited
  },
  ":active": {
    color: textColorLinkActive
  },
  ":hover": {
    color: textColorLinkActive
  }
});

export const skip = pcls({
  "": {
    width: "1px",
    height: "1px",
    position: "absolute",
    top: "auto",
    left: "-10000px",
    overflow: "hidden"
  },
  ":focus": {

    width: "auto",
    height: "auto",
    position: "static"
  }
});

