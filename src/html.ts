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


// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/23c436771a06e6bb72edc427c57cfd36b686468a/types/react/index.d.ts#L1920-L1938
interface HTMLAttributes {

  // Standard HTML Attributes
  accesskey: string;
  autofocus: boolean;
  class: string;
  contenteditable: Booleanish | "inherit";
  contextmenu: string;
  dir: string;
  draggable: Booleanish;
  hidden: boolean;
  id: string;
  lang: string;
  nonce: string;
  placeholder: string;
  slot: string;
  spellcheck: Booleanish;
  // Style: CSSProperties;
  tabindex: number;
  title: string;
  translate: "yes" | "no";

  // WAI-ARIA
  role: AriaRole;

  // RDFa Attributes
  about: string;
  content: string;
  datatype: string;
  // Inlist: any;
  prefix: string;
  property: string;
  rel: string;
  resource: string;
  rev: string;
  typeof: string;
  vocab: string;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its contents
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputMode: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";

  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is: string;
}


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

type HTMLAttributeAnchorTarget =
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    | (string & Record<string, never>);

interface AnchorHTMLAttributes {
  // download: any;
  href: string;
  hrefLang: string;
  media: string;
  ping: string;
  target: HTMLAttributeAnchorTarget;
  type: string;
  referrerPolicy: HTMLAttributeReferrerPolicy;
}

// eslint-disable-next-line no-use-before-define
type AudioHTMLAttributes = MediaHTMLAttributes;

interface AreaHTMLAttributes {
  alt: string;
  coords: string;
  // download: any;
  href: string;
  hrefLang: string;
  media: string;
  referrerPolicy: HTMLAttributeReferrerPolicy;
  shape: string;
  target: string;
}

interface BaseHTMLAttributes {
  href: string;
  target: string;
}

interface BlockquoteHTMLAttributes {
  cite: string;
}

interface ButtonHTMLAttributes {
  disabled: boolean;
  form: string;
  formEncType: string;
  formMethod: string;
  formNoValidate: boolean;
  formTarget: string;
  name: string;
  type: "submit" | "reset" | "button";
  value: string | readonly string[] | number;
}

interface CanvasHTMLAttributes {
  height: number | string;
  width: number | string;
}

interface ColHTMLAttributes {
  span: number;
  width: number | string;
}

interface ColgroupHTMLAttributes {
  span: number;
}

interface DataHTMLAttributes {
  value: string | readonly string[] | number;
}

interface DetailsHTMLAttributes {
  open: boolean;
}

interface DelHTMLAttributes {
  cite: string;
  dateTime: string;
}

interface DialogHTMLAttributes {
  open: boolean;
}

interface EmbedHTMLAttributes {
  height: number | string;
  src: string;
  type: string;
  width: number | string;
}

interface FieldsetHTMLAttributes {
  disabled: boolean;
  form: string;
  name: string;
}

interface FormHTMLAttributes {
  acceptCharset: string;
  autoComplete: string;
  encType: string;
  method: string;
  name: string;
  noValidate: boolean;
  target: string;
}

interface HtmlHTMLAttributes {
  manifest: string;
}

interface IframeHTMLAttributes {
  allow: string;
  allowFullScreen: boolean;
  allowTransparency: boolean;

  /** @deprecated */
  frameBorder: number | string;
  height: number | string;
  loading: "eager" | "lazy";

  /** @deprecated */
  marginHeight: number;

  /** @deprecated */
  marginWidth: number;
  name: string;
  referrerPolicy: HTMLAttributeReferrerPolicy;
  sandbox: string;

  /** @deprecated */
  scrolling: string;
  seamless: boolean;
  src: string;
  srcDoc: string;
  width: number | string;
}

interface ImgHTMLAttributes {
  alt: string;
  crossOrigin: "anonymous" | "use-credentials" | "";
  decoding: "async" | "auto" | "sync";
  height: number | string;
  loading: "eager" | "lazy";
  referrerPolicy: HTMLAttributeReferrerPolicy;
  sizes: string;
  src: string;
  srcSet: string;
  useMap: string;
  width: number | string;
}

interface InsHTMLAttributes {
  cite: string;
  dateTime: string;
}

type HTMLInputTypeAttribute =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | (string & Record<string, never>);

interface InputHTMLAttributes {
  accept: string;
  alt: string;
  autoComplete: string;
  capture: boolean | "user" | "environment"; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked: boolean;
  crossOrigin: "anonymous" | "use-credentials" | "";
  disabled: boolean;
  enterKeyHint: "enter" | "done" | "go" | "next" | "previous" | "search" | "send";
  form: string;
  formEncType: string;
  formMethod: string;
  formNoValidate: boolean;
  formTarget: string;
  height: number | string;
  list: string;
  max: number | string;
  maxLength: number;
  min: number | string;
  minLength: number;
  multiple: boolean;
  name: string;
  pattern: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  size: number;
  src: string;
  step: number | string;
  type: HTMLInputTypeAttribute;
  value: string | readonly string[] | number;
  width: number | string;
}

interface KeygenHTMLAttributes {
  challenge: string;
  disabled: boolean;
  form: string;
  keyType: string;
  keyParams: string;
  name: string;
}

interface LabelHTMLAttributes {
  form: string;
  htmlFor: string;
}

interface LiHTMLAttributes {
  value: string | readonly string[] | number;
}

interface LinkHTMLAttributes {
  as: string;
  crossOrigin: "anonymous" | "use-credentials" | "";
  fetchpriority: "high" | "low" | "auto";
  href: string;
  hrefLang: string;
  integrity: string;
  media: string;
  imageSrcSet: string;
  imageSizes: string;
  referrerPolicy: HTMLAttributeReferrerPolicy;
  sizes: string;
  type: string;
  charset: string;
}

interface MapHTMLAttributes {
  name: string;
}

interface MenuHTMLAttributes {
  type: string;
}

interface MediaHTMLAttributes {
  autoPlay: boolean;
  controls: boolean;
  controlsList: string;
  crossOrigin: "anonymous" | "use-credentials" | "";
  loop: boolean;
  mediaGroup: string;
  muted: boolean;
  playsInline: boolean;
  preload: string;
  src: string;
}

interface MetaHTMLAttributes {
  charset: string;
  "http-equiv": string;
  name: string;
  media: string;
}

interface MeterHTMLAttributes {
  form: string;
  high: number;
  low: number;
  max: number | string;
  min: number | string;
  optimum: number;
  value: string | readonly string[] | number;
}

interface QuoteHTMLAttributes {
  cite: string;
}

interface ObjectHTMLAttributes {
  classID: string;
  data: string;
  form: string;
  height: number | string;
  name: string;
  type: string;
  useMap: string;
  width: number | string;
  wmode: string;
}

interface OlHTMLAttributes {
  reversed: boolean;
  start: number;
  type: "1" | "a" | "A" | "i" | "I";
}

interface OptgroupHTMLAttributes {
  disabled: boolean;
  label: string;
}

interface OptionHTMLAttributes {
  disabled: boolean;
  label: string;
  selected: boolean;
  value: string | readonly string[] | number;
}

interface OutputHTMLAttributes {
  form: string;
  htmlFor: string;
  name: string;
}

interface ParamHTMLAttributes {
  name: string;
  value: string | readonly string[] | number;
}

interface ProgressHTMLAttributes {
  max: number | string;
  value: string | readonly string[] | number;
}

interface SlotHTMLAttributes {
  name: string;
}

interface ScriptHTMLAttributes {
  async: boolean;

  crossOrigin: "anonymous" | "use-credentials" | "";
  defer: boolean;
  integrity: string;
  noModule: boolean;
  referrerPolicy: HTMLAttributeReferrerPolicy;
  src: string;
  type: string;
}

interface SelectHTMLAttributes {
  autoComplete: string;
  disabled: boolean;
  form: string;
  multiple: boolean;
  name: string;
  required: boolean;
  size: number;
  value: string | readonly string[] | number;
}

interface SourceHTMLAttributes {
  height: number | string;
  media: string;
  sizes: string;
  src: string;
  srcSet: string;
  type: string;
  width: number | string;
}

interface StyleHTMLAttributes {
  media: string;
  scoped: boolean;
  type: string;
}

interface TableHTMLAttributes {
  align: "left" | "center" | "right";
  bgcolor: string;
  border: number;
  cellPadding: number | string;
  cellSpacing: number | string;
  frame: boolean;
  rules: "none" | "groups" | "rows" | "columns" | "all";
  summary: string;
  width: number | string;
}

interface TextareaHTMLAttributes {
  autoComplete: string;
  cols: number;
  dirName: string;
  disabled: boolean;
  form: string;
  maxLength: number;
  minLength: number;
  name: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  rows: number;
  value: string | readonly string[] | number;
  wrap: string;
}

interface TdHTMLAttributes {
  align: "left" | "center" | "right" | "justify" | "char";
  colSpan: number;
  headers: string;
  rowSpan: number;
  scope: string;
  abbr: string;
  height: number | string;
  width: number | string;
  valign: "top" | "middle" | "bottom" | "baseline";
}

interface ThHTMLAttributes {
  align: "left" | "center" | "right" | "justify" | "char";
  colSpan: number;
  headers: string;
  rowSpan: number;
  scope: string;
  abbr: string;
}

interface TimeHTMLAttributes {
  dateTime: string;
}

interface TrackHTMLAttributes {
  default: boolean;
  kind: string;
  label: string;
  src: string;
  srcLang: string;
}

interface VideoHTMLAttributes extends MediaHTMLAttributes {
  height: number | string;
  playsInline: boolean;
  poster: string;
  width: number | string;
  disablePictureInPicture: boolean;
  disableRemotePlayback: boolean;
}


interface WebViewHTMLAttributes {
  allowFullScreen: boolean;
  allowpopups: boolean;
  autosize: boolean;
  blinkfeatures: string;
  disableblinkfeatures: string;
  disableguestresize: boolean;
  disablewebsecurity: boolean;
  guestinstance: string;
  httpreferrer: string;
  nodeintegration: boolean;
  partition: string;
  plugins: boolean;
  preload: string;
  src: string;
  useragent: string;
  webpreferences: string;
}


interface Attributes {
  a: AnchorHTMLAttributes;
  address: object;
  area: AreaHTMLAttributes;
  article: object;
  aside: object;
  audio: AudioHTMLAttributes;
  b: object;
  base: BaseHTMLAttributes;
  bdi: object;
  bdo: object;
  big: object;
  blockquote: BlockquoteHTMLAttributes;
  body: object;
  br: object;
  button: ButtonHTMLAttributes;
  canvas: CanvasHTMLAttributes;
  caption: object;
  center: object;
  cite: object;
  code: object;
  col: ColHTMLAttributes;
  colgroup: ColgroupHTMLAttributes;
  data: DataHTMLAttributes;
  datalist: object;
  dd: object;
  del: DelHTMLAttributes;
  details: DetailsHTMLAttributes;
  dfn: object;
  dialog: DialogHTMLAttributes;
  div: object,
  dl: object;
  dt: object;
  em: object;
  embed: EmbedHTMLAttributes;
  fieldset: FieldsetHTMLAttributes;
  figcaption: object;
  figure: object;
  footer: object;
  form: FormHTMLAttributes;
  h1: object;
  h2: object;
  h3: object;
  h4: object;
  h5: object;
  h6: object;
  head: object;
  header: object;
  hgroup: object;
  hr: object;
  html: HtmlHTMLAttributes;
  i: object;
  iframe: IframeHTMLAttributes;
  img: ImgHTMLAttributes;
  input: InputHTMLAttributes;
  ins: InsHTMLAttributes;
  kbd: object;
  keygen: KeygenHTMLAttributes;
  label: LabelHTMLAttributes;
  legend: object;
  li: LiHTMLAttributes;
  link: LinkHTMLAttributes;
  main: object;
  map: MapHTMLAttributes;
  mark: object;
  menu: MenuHTMLAttributes;
  menuitem: object;
  meta: MetaHTMLAttributes;
  meter: MeterHTMLAttributes;
  nav: object;
  noscript: object;
  object: ObjectHTMLAttributes;
  ol: OlHTMLAttributes;
  optgroup: OptgroupHTMLAttributes;
  option: OptionHTMLAttributes;
  output: OutputHTMLAttributes;
  p: object;
  param: ParamHTMLAttributes;
  picture: object;
  pre: object;
  progress: ProgressHTMLAttributes;
  q: QuoteHTMLAttributes;
  rp: object;
  rt: object;
  ruby: object;
  s: object;
  samp: object;
  search: object;
  slot: SlotHTMLAttributes;
  script: ScriptHTMLAttributes;
  section: object;
  select: SelectHTMLAttributes;
  small: object;
  source: SourceHTMLAttributes;
  span: object;
  strong: object;
  style: StyleHTMLAttributes;
  sub: object;
  summary: object;
  sup: object;
  table: TableHTMLAttributes;
  template: object;
  tbody: object;
  td: TdHTMLAttributes;
  textarea: TextareaHTMLAttributes;
  tfoot: object;
  th: ThHTMLAttributes;
  thead: object;
  time: TimeHTMLAttributes;
  title: object;
  tr: object;
  track: TrackHTMLAttributes;
  u: object;
  ul: object;
  "var": object;
  video: VideoHTMLAttributes;
  wbr: object;
  webview: WebViewHTMLAttributes;
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

interface Element<Tag extends Tags> {
  tag: Tag,
  attributes: Partial<Attributes[Tag] & HTMLAttributes>,
  children?: (Element<Tags> | string)[],
}

export function h <Tag extends VoidTags> (
  tag: Tag,
  attributes: Partial<Attributes[Tag] & HTMLAttributes>,
): Element<Tag>;

export function h <Tag extends NonVoidTags> (
  tag: Tag,
  attributes: Partial<Attributes[Tag] & HTMLAttributes>,
// eslint-disable-next-line @typescript-eslint/unified-signatures
  children: (Element<Tags> | string)[]
): Element<Tag>;

// eslint-disable-next-line func-style, id-length
export function h <Tag extends Tags> (
  tag: Tag,
  attributes: Partial<Attributes[Tag] & HTMLAttributes>,
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
