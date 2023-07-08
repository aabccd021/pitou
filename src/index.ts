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
  node: SyntaxNode,
  children: MyNode[],
}

const walk = (node: SyntaxNode): MyNode  => {
  return { node, children: node.children.map(walk), };
}

const main = async () => {
  const jsParser = await makeParser('typescript');
  const parsed = jsParser.parse('const a = 1; const b = 2;');
  const walked = walk(parsed.rootNode);
  await Bun.write(`${import.meta.dir}/../.temp/aab.json`, (JSON.stringify(walked, null, 2)))
  console.log('done');
  // console.log(JSON.stringify(walked, null, 2));
}

await main();

