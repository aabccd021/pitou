import type { SyntaxNode } from 'web-tree-sitter'
import Parser from 'web-tree-sitter'

type Language = 'nix' | 'javascript' | 'typescript'

async function makeParser(lang: Language) {
  await Parser.init()
  const parser = new Parser()
  const Lang = await Parser.Language.load(`${import.meta.dir}/../tree-sitter-wasm/tree-sitter-${lang}.wasm`)
  parser.setLanguage(Lang)
  return parser
}

interface MyNode {
  text: string
  type: string
  row: number
  column: number
}

function walk(node: SyntaxNode): MyNode[] {
  if (node.children.length === 0) {
    const { type, text, startPosition } = node
    return [{ text, type, ...startPosition }]
  }
  console.log('===', node.text)
  return node.children.flatMap(walk)
}

const example = `
if ("aab" === "ccd") {
  return "yoo";
}
`

async function main() {
  const jsParser = await makeParser('typescript')
  const parsed = jsParser.parse(example)
  const walked = walk(parsed.rootNode)
  await Bun.write(`${import.meta.dir}/../.temp/aab.json`, (JSON.stringify(walked, null, 2)))
  console.log('dono')
  const complete: string[] = []
  walked.reduce((prev: null | MyNode, node) => {
    if (prev !== null) {
    }
    complete.push(node.text)
    return node
  }, null)
  console.log(complete)
  // console.log(JSON.stringify(walked, null, 2));
}

await main()
