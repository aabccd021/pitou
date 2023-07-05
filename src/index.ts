import { HighlighterOptions, getHighlighter } from 'shiki'

// const getHighlighterWithWasm = async (options: HighlighterOptions) => {
//   return await getHighlighter(options)
// }

const main = async () => {
  // const highlighter = await getHighlighterWithWasm({
  //   theme: 'nord',
  //   langs: ['javascript', 'python']
  // });
  //
  // const code = `console.log("Here is your code.");`
  //
  // const tokens = highlighter.codeToThemedTokens(code, 'javascript')
  // console.log(tokens);
  //
  const {foo} = await import ('./foo.ts');
  console.log(foo)
}

void main()
