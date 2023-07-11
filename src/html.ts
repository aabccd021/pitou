type Booleanish = boolean | 'true' | 'false';

type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem'
  | (string & {});


type HTMLAttributeReferrerPolicy =
  | ''
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/23c436771a06e6bb72edc427c57cfd36b686468a/types/react/index.d.ts#L1920-L1938
type HTMLAttributes = {

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
  // style?: CSSProperties;
  tabindex?: number;
  title?: string;
  translate?: 'yes' | 'no';

  // WAI-ARIA
  role?: AriaRole;

  // RDFa Attributes
  about?: string;
  content?: string;
  datatype?: string;
  inlist?: any;
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
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /**
   * Specify that a standard HTML element should behave like a defined custom built-in element
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string;
}

type LinkHTMLAttributes = {
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

type Attributes = {
  html: HTMLAttributes,
  title: HTMLAttributes,
  h1: HTMLAttributes,
  link: HTMLAttributes & LinkHTMLAttributes,
  meta: HTMLAttributes,
}

type Element<Tag extends keyof Attributes> = {
  tag: Tag,
  attributes: Attributes[Tag],
  children: (Element<keyof Attributes> | string)[] | undefined,
}

export const h = <Tag extends keyof Attributes>(
  tag: Tag,
  attributes: Attributes[Tag],
  children: (Element<keyof Attributes> | string)[] | undefined
): Element<Tag> => ({ tag, attributes, children })

export const elementToString = <Tag extends keyof Attributes>(
  element: Element<Tag> | string
): string => {
  if (typeof element === 'string') {
    return element;
  }
  const attributes = Object.entries(element.attributes)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('');
  if (element.children === undefined) {
    return `<${element.tag}${attributes}>`
  }
  const children = element.children.map(elementToString).join('');
  return `<${element.tag}${attributes}>${children}</${element.tag}>`
}

