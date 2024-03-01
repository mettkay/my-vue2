import { generate } from './generate';
import {parseHtml} from './parseAst'

export function compileToFunction(el) {
  //把html转换成ast语法树
  let ast = parseHtml(el)

  //把ast语法树转换成render函数
  let code = generate(ast)
}
