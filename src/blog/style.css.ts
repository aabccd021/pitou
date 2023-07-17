import {
  toText
} from "../cssUtil";
import * as style from "../style";

export const content = () => Object
  .values(style)
  .map(toText)
  .join("\n");

