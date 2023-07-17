import type * as CSS from "csstype";
import {
  createHash
} from "node:crypto";
import {
  stringify
} from "safe-stable-stringify";

type Properties = CSS.StandardPropertiesHyphen;

interface SelectedClass {
  media?: string;
  selector?: CSS.Pseudos | (string & NonNullable<unknown>);
  properties: Properties;
}

interface CompiledCls {
  name: string;
  classes: SelectedClass[];
}

const classNameOf = (param: unknown): string => {

  const hash = stringify(param) ?? "";
  // const hash = createHash("md5")
  //   .update(str)
  //   .digest("hex");

  // class name must start with a letter
  return `gen-${hash}`;

};

const mkPropertiesStr = (properties: Properties): string => {

  const propertiesStr = Object
    .entries(properties)
    .map(([ key, value ]) => `\n  ${key}: ${value};`)
    .sort()
    .join("");

  return `{${propertiesStr}\n}`;

};

const cls = (properties: Properties): CompiledCls => {

  const name = classNameOf(properties);
  // const propertiesStr = mkPropertiesStr(properties);
  const classes = [ {
    properties
  } ];


  return {
    name,
    classes
    // text: `.${name} ${propertiesStr}`
  };

};

const pcls = (classes: SelectedClass[]): CompiledCls => {

  const name = classNameOf(classes);

  /*
   * const text = selectorProperties
   *   .map((spec) => {
   *
   *     const propertiesStr = mkPropertiesStr(spec.properties);
   *     const selectorStr = spec.selector ?? "";
   *     const classDef = `.${name}${selectorStr} ${propertiesStr}`;
   *     if (spec.media !== undefined) {
   *
   *       return `@media ${spec.media} {\n.${classDef}\n}`;
   *
   *     }
   *     return classDef;
   *
   *   })
   *   .join("\n");
   */

  return {
    name,
    classes
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
  margin: ".5em",
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
  "line-height": 1.5,
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

const a = (properties: Properties): SelectedClass[] => [
  {
    properties: {
      color: textColorLink,
      "text-underline-offset": ".3em",
      ...properties
    }
  },
  {
    selector: ":visited",
    properties: {
      color: textColorLinkVisited
    }
  },
  {
    selector: ":active",
    properties: {
      color: textColorLinkActive
    }
  },
  {
    selector: ":hover",
    properties: {
      color: textColorLinkActive
    }
  }
];

export const navItem = pcls(
  a({
    display: "inline-block"
  })
);

export const postlistLink = pcls(a({
  color: textColorLink,
  "text-underline-offset": ".3em",
  "margin-bottom": ".3em",
  "text-decoration-color": lineColor,
  "text-underline-position": "from-font",
  "font-size": "1.1875em",
  "font-weight": 700,
  "line-height": 2,
  "text-decoration-thickness": "1px",
  display: "block"
}));

export const skip = pcls([
  {
    properties: {
      width: "1px",
      height: "1px",
      position: "absolute",
      top: "auto",
      left: "-10000px",
      overflow: "hidden"
    }
  },
  {
    selector: ":focus",
    properties: {
      width: "auto",
      height: "auto",
      position: "static"
    }
  }
]);

