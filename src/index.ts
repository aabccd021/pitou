import Parser, { SyntaxNode } from 'web-tree-sitter';

type Language = 'nix' | 'javascript' | 'typescript';

const makeParser = async (lang: Language) => {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load(`${import.meta.dir}/../tree-sitter-wasm/tree-sitter-${lang}.wasm`);
  parser.setLanguage(Lang);
  return parser;
}

type MyNode = {
  leaf: true,
  type: string,
  text: string,
} | {
  leaf: false,
  type: string,
  children: MyNode[],
}

const walk = (node: SyntaxNode): MyNode  => {
  if (node.children.length === 0) {
    return {
      leaf: true,
      type: node.type,
      text: node.text,
    };
  }
  return {
    leaf: false,
    type: node.type,
    children: node.children.map(walk),
  };
}

const main = async () => {
  const jsParser = await makeParser('typescript');
  const str = await Bun.file(import.meta.path).text();
  const parsed = jsParser.parse(str);
  const walked = walk(parsed.rootNode);
  Bun.write(`${import.meta.dir}/../.temp/aab.json`, (JSON.stringify(walked, null, 2)))
  console.log(JSON.stringify(walked, null, 2));
}

await main();

