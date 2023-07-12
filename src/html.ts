type Booleanish = boolean | "true" | "false";

type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & Record<string, never>);


type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/23c436771a06e6bb72edc427c57cfd36b686468a/types/react/index.d.ts#L1920-L1938
interface HTMLAttributes {

  // Standard HTML Attributes
  accesskey?: string;
  autofocus?: boolean;
  classname?: string;
  contenteditable?: Booleanish | "inherit";
  contextmenu?: string;
  dir?: string;
  draggable?: Booleanish;
  hidden?: boolean;
  id?: string;
  lang?: string;
  nonce?: string;
  placeholder?: string;
  slot?: string;
  spellcheck?: Booleanish;
  // Style?: CSSProperties;
  tabindex?: number;
  title?: string;
  translate?: "yes" | "no";

  // WAI-ARIA
  role?: AriaRole;

  // RDFa Attributes
  about?: string;
  content?: string;
  datatype?: string;
  // Inlist?: any;
  prefix?: string;
  property?: string;
  rel?: string;
  resource?: string;
  rev?: string;
  typeof?: string;
  vocab?: string;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string;
}

interface LinkHTMLAttributes {
  as?: string;
  crossorigin?: "anonymous" | "use-credentials" | "";
  fetchpriority?: "high" | "low" | "auto";
  href?: string;
  hreflang?: string;
  integrity?: string;
  media?: string;
  imagesrcset?: string;
  imagesizes?: string;
  referrerpolicy?: HTMLAttributeReferrerPolicy;
  sizes?: string;
  type?: string;
  charset?: string;
}


interface MetaHTMLAttributes {
  charset?: string;
  "http-equiv"?: string;
  name?: string;
  media?: string;
}

interface Attributes {
  html: HTMLAttributes,
  title: HTMLAttributes,
  h1: HTMLAttributes,
  link: HTMLAttributes & LinkHTMLAttributes,
  meta: HTMLAttributes & MetaHTMLAttributes,
  area: HTMLAttributes,
  base: HTMLAttributes,
  br: HTMLAttributes,
  col: HTMLAttributes,
  embed: HTMLAttributes,
  hr: HTMLAttributes,
  img: HTMLAttributes,
  input: HTMLAttributes,
  source: HTMLAttributes,
  track: HTMLAttributes,
  wbr: HTMLAttributes,
}

interface Element<Tag extends Tags> {
  tag: Tag,
  attributes: Attributes[Tag],
  children?: (Element<Tags> | string)[],
}

type Tags = keyof Attributes;

type VoidTags =
  "area" |
  "base" |
  "br" |
  "col" |
  "embed" |
  "hr" |
  "img" |
  "input" |
  "link" |
  "meta" |
  "source" |
  "track" |
  "wbr";

type NonVoidTags = Exclude<Tags, VoidTags>;

export function h <Tag extends VoidTags>(
  tag: Tag,
  attributes: Attributes[Tag],
): Element<Tag>;

export function h <Tag extends NonVoidTags>(
  tag: Tag,
  attributes: Attributes[Tag],
  children: (Element<Tags> | string)[]
): Element<Tag>;

export function h <Tag extends Tags> (
  tag: Tag,
  attributes: Attributes[Tag],
  children?: (Element<Tags> | string)[]
): Element<Tag> {

  return {
    tag,
    attributes,
    children
  };

}

export const elementToString = <Tag extends Tags>(
  element: Element<Tag> | string
): string => {

  if (typeof element === "string") {

    return element;

  }
  const attributes = Object.entries(element.attributes).
      map(([
        key,
        value
      ]) => ` ${key}="${value}"`).
      join(""),
    openTag = `<${element.tag}${attributes}>`;
  if (element.children === undefined) {

    return openTag;

  }
  const childrenStr = element.children.map(elementToString).join("");
  return `${openTag}${childrenStr}</${element.tag}>`;

};
