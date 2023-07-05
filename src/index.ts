import Parser from 'web-tree-sitter';

const main = async () => {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load(`${import.meta.dir}/tree-sitter-javascript.wasm`);
  parser.setLanguage(Lang);
  const tree = parser.parse('let x = 1;');
  console.log(tree.rootNode.toString());
}

await main();

