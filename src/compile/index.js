import {parseHtml} from './parseAst'

export function compileToFunction(el) {
  let ast = parseHtml(el)
  console.log('%c 🍩 ast: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', ast);
}
