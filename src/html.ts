type Booleanish = boolean | 'true' | 'false'

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/23c436771a06e6bb72edc427c57cfd36b686468a/types/react/index.d.ts#L1920-L1938
interface StandardAttributes {
  accesskey?: string | undefined
  autofocus?: boolean | undefined
  classname?: string | undefined
  contenteditable?: Booleanish | 'inherit' | undefined
  contextmenu?: string | undefined
  dir?: string | undefined
  draggable?: Booleanish | undefined
  hidden?: boolean | undefined
  id?: string | undefined
  lang?: string | undefined
  nonce?: string | undefined
  placeholder?: string | undefined
  slot?: string | undefined
  spellcheck?: Booleanish | undefined
  style?: {} | undefined
  tabindex?: number | undefined
  title?: string | undefined
  translate?: 'yes' | 'no' | undefined
}

interface Attributes {
  html: StandardAttributes
  title: StandardAttributes
  h1: StandardAttributes
}

interface Element<Tag extends keyof Attributes> {
  tag: Tag
  attributes: Attributes[Tag]
  children: (Element<keyof Attributes> | string)[]
}

export function h<Tag extends keyof Attributes>(tag: Tag,
  attributes: Attributes[Tag],
  children: (Element<keyof Attributes> | string)[]): Element<Tag> {
  return { tag, attributes, children }
}

function elementToLines<Tag extends keyof Attributes>(element: Element<Tag> | string): string[] {
  if (typeof element === 'string')
    return [element]

  const attributes = Object.entries(element.attributes)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('')
  const children = element.children.flatMap(elementToLines).map(child => `  ${child}`)
  return [
    `<${element.tag}${attributes}>`,
    ...children,
    `</${element.tag}>`,
  ]
}

export function elementToString<Tag extends keyof Attributes>(element: Element<Tag>): string {
  return elementToLines(element).join('\n')
}
