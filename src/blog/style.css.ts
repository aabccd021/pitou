import {
  toText
} from "../cssUtil";
import * as style from "../style";

const text = Object
  .values(style)
  .map(toText)
  .join("\n");

process.stdout.write(text);
