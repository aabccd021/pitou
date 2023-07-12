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
    // download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

// eslint-disable-next-line no-use-before-define
type AudioHTMLAttributes = MediaHTMLAttributes;

interface AreaHTMLAttributes {
    alt?: string | undefined;
    coords?: string | undefined;
    // download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    shape?: string | undefined;
    target?: string | undefined;
}

interface BaseHTMLAttributes {
    href?: string | undefined;
    target?: string | undefined;
}

interface BlockquoteHTMLAttributes {
    cite?: string | undefined;
}

interface ButtonHTMLAttributes {
    disabled?: boolean | undefined;
    form?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    name?: string | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface CanvasHTMLAttributes {
    height?: number | string | undefined;
    width?: number | string | undefined;
}

interface ColHTMLAttributes {
    span?: number | undefined;
    width?: number | string | undefined;
}

interface ColgroupHTMLAttributes {
    span?: number | undefined;
}

interface DataHTMLAttributes {
    value?: string | readonly string[] | number | undefined;
}

interface DetailsHTMLAttributes {
    open?: boolean | undefined;
}

interface DelHTMLAttributes {
    cite?: string | undefined;
    dateTime?: string | undefined;
}

interface DialogHTMLAttributes {
    open?: boolean | undefined;
}

interface EmbedHTMLAttributes {
    height?: number | string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
}

interface FieldsetHTMLAttributes {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
}

interface FormHTMLAttributes {
    acceptCharset?: string | undefined;
    autoComplete?: string | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
}

interface HtmlHTMLAttributes {
    manifest?: string | undefined;
}

interface IframeHTMLAttributes {
    allow?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;

    /** @deprecated */
    frameBorder?: number | string | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;

    /** @deprecated */
    marginHeight?: number | undefined;

    /** @deprecated */
    marginWidth?: number | undefined;
    name?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sandbox?: string | undefined;

    /** @deprecated */
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    width?: number | string | undefined;
}

interface ImgHTMLAttributes {
    alt?: string | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    decoding?: "async" | "auto" | "sync" | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    useMap?: string | undefined;
    width?: number | string | undefined;
}

interface InsHTMLAttributes {
    cite?: string | undefined;
    dateTime?: string | undefined;
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
    accept?: string | undefined;
    alt?: string | undefined;
    autoComplete?: string | undefined;
    capture?: boolean | "user" | "environment" | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    disabled?: boolean | undefined;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
    form?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    height?: number | string | undefined;
    list?: string | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | readonly string[] | number | undefined;
    width?: number | string | undefined;
}

interface KeygenHTMLAttributes {
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keyType?: string | undefined;
    keyParams?: string | undefined;
    name?: string | undefined;
}

interface LabelHTMLAttributes {
    form?: string | undefined;
    htmlFor?: string | undefined;
}

interface LiHTMLAttributes {
    value?: string | readonly string[] | number | undefined;
}

interface LinkHTMLAttributes {
    as?: string | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    fetchpriority?: "high" | "low" | "auto";
    href?: string | undefined;
    hrefLang?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imageSrcSet?: string | undefined;
    imageSizes?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charset?: string | undefined;
}

interface MapHTMLAttributes {
    name?: string | undefined;
}

interface MenuHTMLAttributes {
    type?: string | undefined;
}

interface MediaHTMLAttributes {
    autoPlay?: boolean | undefined;
    controls?: boolean | undefined;
    controlsList?: string | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    loop?: boolean | undefined;
    mediaGroup?: string | undefined;
    muted?: boolean | undefined;
    playsInline?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
}

interface MetaHTMLAttributes {
    charset?: string | undefined;
    "http-equiv"?: string | undefined;
    name?: string | undefined;
    media?: string | undefined;
}

interface MeterHTMLAttributes {
    form?: string | undefined;
    high?: number | undefined;
    low?: number | undefined;
    max?: number | string | undefined;
    min?: number | string | undefined;
    optimum?: number | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface QuoteHTMLAttributes {
    cite?: string | undefined;
}

interface ObjectHTMLAttributes {
    classID?: string | undefined;
    data?: string | undefined;
    form?: string | undefined;
    height?: number | string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
}

interface OlHTMLAttributes {
    reversed?: boolean | undefined;
    start?: number | undefined;
    type?: "1" | "a" | "A" | "i" | "I" | undefined;
}

interface OptgroupHTMLAttributes {
    disabled?: boolean | undefined;
    label?: string | undefined;
}

interface OptionHTMLAttributes {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface OutputHTMLAttributes {
    form?: string | undefined;
    htmlFor?: string | undefined;
    name?: string | undefined;
}

interface ParamHTMLAttributes {
    name?: string | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface ProgressHTMLAttributes {
    max?: number | string | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface SlotHTMLAttributes {
    name?: string | undefined;
}

interface ScriptHTMLAttributes {
    async?: boolean | undefined;

    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    defer?: boolean | undefined;
    integrity?: string | undefined;
    noModule?: boolean | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    src?: string | undefined;
    type?: string | undefined;
}

interface SelectHTMLAttributes {
    autoComplete?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    value?: string | readonly string[] | number | undefined;
}

interface SourceHTMLAttributes {
    height?: number | string | undefined;
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
}

interface StyleHTMLAttributes {
    media?: string | undefined;
    scoped?: boolean | undefined;
    type?: string | undefined;
}

interface TableHTMLAttributes {
    align?: "left" | "center" | "right" | undefined;
    bgcolor?: string | undefined;
    border?: number | undefined;
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    frame?: boolean | undefined;
    rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined;
    summary?: string | undefined;
    width?: number | string | undefined;
}

interface TextareaHTMLAttributes {
    autoComplete?: string | undefined;
    cols?: number | undefined;
    dirName?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | undefined;
    value?: string | readonly string[] | number | undefined;
    wrap?: string | undefined;
}

interface TdHTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colSpan?: number | undefined;
    headers?: string | undefined;
    rowSpan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
    height?: number | string | undefined;
    width?: number | string | undefined;
    valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
}

interface ThHTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colSpan?: number | undefined;
    headers?: string | undefined;
    rowSpan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
}

interface TimeHTMLAttributes {
    dateTime?: string | undefined;
}

interface TrackHTMLAttributes {
    default?: boolean | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srcLang?: string | undefined;
}

interface VideoHTMLAttributes extends MediaHTMLAttributes {
    height?: number | string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    width?: number | string | undefined;
    disablePictureInPicture?: boolean | undefined;
    disableRemotePlayback?: boolean | undefined;
}


interface WebViewHTMLAttributes {
  allowFullScreen?: boolean | undefined;
  allowpopups?: boolean | undefined;
  autosize?: boolean | undefined;
  blinkfeatures?: string | undefined;
  disableblinkfeatures?: string | undefined;
  disableguestresize?: boolean | undefined;
  disablewebsecurity?: boolean | undefined;
  guestinstance?: string | undefined;
  httpreferrer?: string | undefined;
  nodeintegration?: boolean | undefined;
  partition?: string | undefined;
  plugins?: boolean | undefined;
  preload?: string | undefined;
  src?: string | undefined;
  useragent?: string | undefined;
  webpreferences?: string | undefined;
}


interface Attributes {
  a: AnchorHTMLAttributes;
  address:Record<string, never>;
  area: AreaHTMLAttributes;
  article:Record<string, never>;
  aside:Record<string, never>;
  audio: AudioHTMLAttributes;
  b:Record<string, never>;
  base: BaseHTMLAttributes;
  bdi:Record<string, never>;
  bdo:Record<string, never>;
  big:Record<string, never>;
  blockquote: BlockquoteHTMLAttributes;
  body:Record<string, never>;
  br:Record<string, never>;
  button: ButtonHTMLAttributes;
  canvas: CanvasHTMLAttributes;
  caption:Record<string, never>;
  center:Record<string, never>;
  cite:Record<string, never>;
  code:Record<string, never>;
  col: ColHTMLAttributes;
  colgroup: ColgroupHTMLAttributes;
  data: DataHTMLAttributes;
  datalist:Record<string, never>;
  dd:Record<string, never>;
  del: DelHTMLAttributes;
  details: DetailsHTMLAttributes;
  dfn:Record<string, never>;
  dialog: DialogHTMLAttributes;
  div:Record<string, never>;
  dl:Record<string, never>;
  dt:Record<string, never>;
  em:Record<string, never>;
  embed: EmbedHTMLAttributes;
  fieldset: FieldsetHTMLAttributes;
  figcaption:Record<string, never>;
  figure:Record<string, never>;
  footer:Record<string, never>;
  form: FormHTMLAttributes;
  h1:Record<string, never>;
  h2:Record<string, never>;
  h3:Record<string, never>;
  h4:Record<string, never>;
  h5:Record<string, never>;
  h6:Record<string, never>;
  head:Record<string, never>;
  header:Record<string, never>;
  hgroup:Record<string, never>;
  hr:Record<string, never>;
  html: HtmlHTMLAttributes;
  i:Record<string, never>;
  iframe: IframeHTMLAttributes;
  img: ImgHTMLAttributes;
  input: InputHTMLAttributes;
  ins: InsHTMLAttributes;
  kbd:Record<string, never>;
  keygen: KeygenHTMLAttributes;
  label: LabelHTMLAttributes;
  legend:Record<string, never>;
  li: LiHTMLAttributes;
  link: LinkHTMLAttributes;
  main:Record<string, never>;
  map: MapHTMLAttributes;
  mark:Record<string, never>;
  menu: MenuHTMLAttributes;
  menuitem:Record<string, never>;
  meta: MetaHTMLAttributes;
  meter: MeterHTMLAttributes;
  nav:Record<string, never>;
  noscript:Record<string, never>;
  object: ObjectHTMLAttributes;
  ol: OlHTMLAttributes;
  optgroup: OptgroupHTMLAttributes;
  option: OptionHTMLAttributes;
  output: OutputHTMLAttributes;
  p:Record<string, never>;
  param: ParamHTMLAttributes;
  picture:Record<string, never>;
  pre:Record<string, never>;
  progress: ProgressHTMLAttributes;
  q: QuoteHTMLAttributes;
  rp:Record<string, never>;
  rt:Record<string, never>;
  ruby:Record<string, never>;
  s:Record<string, never>;
  samp:Record<string, never>;
  search:Record<string, never>;
  slot: SlotHTMLAttributes;
  script: ScriptHTMLAttributes;
  section:Record<string, never>;
  select: SelectHTMLAttributes;
  small:Record<string, never>;
  source: SourceHTMLAttributes;
  span:Record<string, never>;
  strong:Record<string, never>;
  style: StyleHTMLAttributes;
  sub:Record<string, never>;
  summary:Record<string, never>;
  sup:Record<string, never>;
  table: TableHTMLAttributes;
  template:Record<string, never>;
  tbody:Record<string, never>;
  td: TdHTMLAttributes;
  textarea: TextareaHTMLAttributes;
  tfoot:Record<string, never>;
  th: ThHTMLAttributes;
  thead:Record<string, never>;
  time: TimeHTMLAttributes;
  title:Record<string, never>;
  tr:Record<string, never>;
  track: TrackHTMLAttributes;
  u:Record<string, never>;
  ul:Record<string, never>;
  "var":Record<string, never>;
  video: VideoHTMLAttributes;
  wbr:Record<string, never>;
  webview: WebViewHTMLAttributes;
}

type Tags = keyof Attributes;

interface Element<Tag extends Tags> {
  tag: Tag,
  attributes: Attributes[Tag] & HTMLAttributes,
  children?: (Element<Tags> | string)[],
}

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
  attributes: Attributes[Tag] & HTMLAttributes,
): Element<Tag>;

export function h <Tag extends NonVoidTags>(
  tag: Tag,
  attributes: Attributes[Tag] & HTMLAttributes,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  children: (Element<Tags> | string)[]
): Element<Tag>;

// eslint-disable-next-line func-style, id-length
export function h <Tag extends Tags> (
  tag: Tag,
  attributes: Attributes[Tag] & HTMLAttributes,
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
