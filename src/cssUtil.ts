import {
  createHash
} from "crypto";
import stringify from "safe-stable-stringify";
import type * as CSS from "csstype";

export type Properties = CSS.StandardPropertiesHyphen;

export const classNameOf = (param: unknown): string => {

  const str = stringify(param) ?? "";
  const hash = createHash("md5")
    .update(str)
    .digest("hex");

  // css class name must start with a letter
  return `gen-${hash}`;

};

export interface SelectedClass {
  media?: string;
  selector?: CSS.Pseudos | (string & NonNullable<unknown>);
  properties: Properties;
}

export const toText = (classes: SelectedClass[]): string => {

  const name = classNameOf(classes);

  return classes
    .map((cls) => {

      const propertiesStr = Object
        .entries(cls.properties)
        .map(([ key, value ]) => `\n  ${key}: ${value};`)
        .sort()
        .join("");

      const selectorStr = cls.selector ?? "";

      const classDef = `.${name}${selectorStr} {\n${propertiesStr}\n}`;

      if (cls.media !== undefined) {

        return `@media ${cls.media} {\n.${classDef}\n}`;

      }
      return classDef;

    })
    .join("\n");

};

