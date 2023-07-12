// Import Parser, { SyntaxNode } from 'web-tree-sitter';
import {
  elementToString, h
} from "./html";

// Type Language = 'nix' | 'javascript' | 'typescript';

/*
 * Const makeParser = async (lang: Language) => {
 *   await Parser.init();
 *   const parser = new Parser();
 *   const Lang = await Parser.Language.load(`${import.meta.dir}/../tree-sitter-wasm/tree-sitter-${lang}.wasm`);
 *   parser.setLanguage(Lang);
 *   return parser;
 * }
 *
 * type MyNode = {
 *   text: string,
 *   type: string,
 *   row: number,
 *   column: number,
 * };
 *
 * const walk = (node: SyntaxNode): MyNode[]  => {
 *   if (node.children.length === 0) {
 *     const {type, text, startPosition} = node;
 *     return [{ text, type,  ...startPosition }];
 *   }
 *   console.log('===', node.text)
 *   return node.children.flatMap(walk);
 * }
 *
 * const example = `
 * if ("aab" === "ccd") {
 *   return "yoo";
 * }
 * `
 *
 * const zzz = link({ href:"/favicon.ico", rel:"icon" });
 *
 */
const main = () => {

  /*
   * Const jsParser = await makeParser('typescript');
   * Const parsed = jsParser.parse(example);
   * Const walked = walk(parsed.rootNode);
   * Await Bun.write(`${import.meta.dir}/../.temp/aab.json`, (JSON.stringify(walked, null, 2)))
   * Console.log('dono');
   * Const complete: string[] = [];
   * Walked.reduce((prev: null | MyNode, node) => {
   *   If (prev !== null) {
   *   }
   *   Complete.push(node.text);
   *   Return node;
   * }, null);
   * Console.log(complete);
   *
   */
  const page = h(
      "html", {
        lang: "en"
      }, [
        h(
          "link", {
            href: "/favicon.ico",
            rel: "icon"
          }
        ),
        h(
          "link", {
            href: "/favicon.svg",
            rel: "icon",
            type: "image/svg+xml"
          }
        ),
        h(
          "link", {
            href: "/apple-touch-icon.png",
            rel: "apple-touch-icon"
          }
        )
      ]
    ),

    htmlString = elementToString(page);

  console.log(htmlString);


  // Console.log(JSON.stringify(walked, null, 2));

};

main();

