import Parser from 'web-tree-sitter';

type Language = 'nix' | 'javascript';

const makeParser = async (lang: Language) => {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load(`${import.meta.dir}/tree-sitter-${lang}.wasm`);
  parser.setLanguage(Lang);
  return parser;
}

const main = async () => {
  const jsParser = await makeParser('javascript');
  console.log(jsParser.parse('let x = 1').rootNode.toString())

  const nixParser = await makeParser('nix');
  console.log(nixParser.parse('key: _: key').rootNode.toString())
}

await main();

