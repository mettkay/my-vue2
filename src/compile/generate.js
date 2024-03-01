var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function generate(el) {
  console.log('%c 🥞 el: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', el);
  let children = genChildren(el.children)
  let code = `_c(${el.tag},${el.attrs.length ? genPorps(el.attrs) : 'null'},${children? children:'null'})`
  console.log('%c 🍵 code: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', code);
}

function genChildren(children) {
  if (children) {
    return children.map(child => gen(child)).join(',')
  }
}

function gen(node) {
  if (node.type === 1) {
    return generate(node)
  }

  if (node.type === 3) {
    let text = node.text
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }
  }
}

//处理样式
function genPorps(attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(e => {
        let [key, value] = e.split(':')
        obj[key] = value
      });
      attr.value = obj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }

  return `${str.slice(0,-1)}`
}