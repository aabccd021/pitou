type Booleanish = boolean | "true" | "false";

interface AriaAttributes {

  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: string | undefined;

  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: Booleanish | undefined;

  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;

  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  /**
   * Defines a string value that labels the current element, which is intended to be converted into Braille.
   * @see aria-label.
   */
  "aria-braillelabel"?: string | undefined;

  /**
   * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
   * @see aria-roledescription.
   */
  "aria-brailleroledescription"?: string | undefined;
  "aria-busy"?: Booleanish | undefined;

  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed @see aria-selected.
   */
  "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;

  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  "aria-colcount"?: number | undefined;

  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  "aria-colindex"?: number | undefined;

  /**
   * Defines a human readable text alternative of aria-colindex.
   * @see aria-rowindextext.
   */
  "aria-colindextext"?: string | undefined;

  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  "aria-colspan"?: number | undefined;

  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  "aria-controls"?: string | undefined;

  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined;

  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-describedby"?: string | undefined;

  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-description"?: string | undefined;

  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  "aria-details"?: string | undefined;

  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden @see aria-readonly.
   */
  "aria-disabled"?: Booleanish | undefined;

  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;

  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  "aria-errormessage"?: string | undefined;

  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: Booleanish | undefined;

  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string | undefined;

  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: Booleanish | undefined;

  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;

  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  "aria-hidden"?: Booleanish | undefined;

  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;

  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: string | undefined;

  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  "aria-label"?: string | undefined;

  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  "aria-labelledby"?: string | undefined;

  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: number | undefined;

  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: "off" | "assertive" | "polite" | undefined;

  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: Booleanish | undefined;

  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: Booleanish | undefined;

  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: Booleanish | undefined;

  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: "horizontal" | "vertical" | undefined;

  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  "aria-owns"?: string | undefined;

  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: string | undefined;

  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  "aria-posinset"?: number | undefined;

  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked @see aria-selected.
   */
  "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;

  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  "aria-readonly"?: Booleanish | undefined;

  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined;

  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: Booleanish | undefined;

  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: string | undefined;

  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  "aria-rowcount"?: number | undefined;

  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount @see aria-rowspan.
   */
  "aria-rowindex"?: number | undefined;

  /**
   * Defines a human readable text alternative of aria-rowindex.
   * @see aria-colindextext.
   */
  "aria-rowindextext"?: string | undefined;

  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex @see aria-colspan.
   */
  "aria-rowspan"?: number | undefined;

  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked @see aria-pressed.
   */
  "aria-selected"?: Booleanish | undefined;

  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  "aria-setsize"?: number | undefined;

  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;

  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: number | undefined;

  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: number | undefined;

  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  "aria-valuenow"?: number | undefined;

  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: string | undefined;
}

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
  | (string & NonNullable<unknown>);


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
    | (string & NonNullable<unknown>);

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
  value: string | number;
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
  value: string | number;
}

interface DetailsHTMLAttributes {
  open: boolean;
}

interface DelHTMLAttributes {
  cite: string;
  datetime: string;
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
  srcset: string;
  useMap: string;
  width: number | string;
}

interface InsHTMLAttributes {
  cite: string;
  datetime: string;
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
    | (string & NonNullable<unknown>);

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
  value: string | number;
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
  value: string | number;
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
  value: string | number;
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
  value: string | number;
}

interface OutputHTMLAttributes {
  form: string;
  htmlFor: string;
  name: string;
}

interface ParamHTMLAttributes {
  name: string;
  value: string | number;
}

interface ProgressHTMLAttributes {
  max: number | string;
  value: string | number;
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
  value: string | number;
}

interface SourceHTMLAttributes {
  height: number | string;
  media: string;
  sizes: string;
  src: string;
  srcset: string;
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
  value: string | number;
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
  datetime: string;
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

type AttributesOf<Tag extends Tags> = Partial<Attributes[Tag] & HTMLAttributes & AriaAttributes>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-use-before-define
type Child = (Element<Tags> | string);

interface Element<Tag extends Tags> {
  tag: Tag,
  attributes: AttributesOf<Tag>,
  children?: Child[],
}

export const voidElement = <Tag extends Tags>(tag: Tag) => (
  attributes: AttributesOf<Tag>
): Element<Tag> => ({
  tag,
  attributes
});

export const element = <Tag extends Tags>(tag: Tag) => (
  attributes: AttributesOf<Tag>,
  children?: Child[]
): Element<Tag> => ({
  tag,
  attributes,
  children
});

export const a = element("a");
export const address = element("address");
export const area = voidElement("area");
export const article = element("article");
export const aside = element("aside");
export const audio = element("audio");
export const b = element("b");
export const base = voidElement("base");
export const bdi = element("bdi");
export const bdo = element("bdo");
export const big = element("big");
export const blockquote = element("blockquote");
export const body = element("body");
export const br = voidElement("br");
export const button = element("button");
export const canvas = element("canvas");
export const caption = element("caption");
export const center = element("center");
export const cite = element("cite");
export const code = element("code");
export const col = voidElement("col");
export const colgroup = element("colgroup");
export const data = element("data");
export const datalist = element("datalist");
export const dd = element("dd");
export const del = element("del");
export const details = element("details");
export const dfn = element("dfn");
export const dialog = element("dialog");
export const div = element("div");
export const dl = element("dl");
export const dt = element("dt");
export const em = element("em");
export const embed = voidElement("embed");
export const fieldset = element("fieldset");
export const figcaption = element("figcaption");
export const figure = element("figure");
export const footer = element("footer");
export const form = element("form");
export const h1 = element("h1");
export const h2 = element("h2");
export const h3 = element("h3");
export const h4 = element("h4");
export const h5 = element("h5");
export const h6 = element("h6");
export const head = element("head");
export const header = element("header");
export const hgroup = element("hgroup");
export const hr = voidElement("hr");
export const html = element("html");
export const i = element("i");
export const iframe = element("iframe");
export const img = voidElement("img");
export const input = voidElement("input");
export const ins = element("ins");
export const kbd = element("kbd");
export const keygen = element("keygen");
export const label = element("label");
export const legend = element("legend");
export const li = element("li");
export const link = voidElement("link");
export const main = element("main");
export const map = element("map");
export const mark = element("mark");
export const menu = element("menu");
export const menuitem = element("menuitem");
export const meta = voidElement("meta");
export const meter = element("meter");
export const nav = element("nav");
export const noscript = element("noscript");
export const object = element("object");
export const ol = element("ol");
export const optgroup = element("optgroup");
export const option = element("option");
export const output = element("output");
export const p = element("p");
export const param = element("param");
export const picture = element("picture");
export const pre = element("pre");
export const progress = element("progress");
export const q = element("q");
export const rp = element("rp");
export const rt = element("rt");
export const ruby = element("ruby");
export const s = element("s");
export const samp = element("samp");
export const search = element("search");
export const slot = element("slot");
export const script = element("script");
export const section = element("section");
export const select = element("select");
export const small = element("small");
export const source = voidElement("source");
export const span = element("span");
export const strong = element("strong");
export const style = element("style");
export const sub = element("sub");
export const summary = element("summary");
export const sup = element("sup");
export const table = element("table");
export const template = element("template");
export const tbody = element("tbody");
export const td = element("td");
export const textarea = element("textarea");
export const tfoot = element("tfoot");
export const th = element("th");
export const thead = element("thead");
export const time = element("time");
export const title = element("title");
export const tr = element("tr");
export const track = voidElement("track");
export const u = element("u");
export const ul = element("ul");
export const var_ = element("var");
export const video = element("video");
export const wbr = voidElement("wbr");
export const webview = element("webview");

export const elementToString = (
  el: Child
): string => {

  if (typeof el === "string") {

    return el;

  }
  const attributes = Object.entries(el.attributes)
      .map(([
        key,
        value
      ]) => ` ${key}="${value}"`)
      .join(""),
    openTag = `<${el.tag}${attributes}>`;
  if (el.children === undefined) {

    return openTag;

  }
  const childrenStr = el.children.map(elementToString)
    .join("");
  return `${openTag}${childrenStr}</${el.tag}>`;

};
