var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function generate(el) {
  let children = genChildren(el.children)
  let code = `_c('${el.tag}',${el.attrs.length ? `{ ${genPorps(el.attrs)} }` : '{}'},${children ? children : ''})`
  return code
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

    let tokens = []
    let lastIndex = defaultTagRE.lastIndex = 0
    let match

    while (match = defaultTagRE.exec(text)) {
      let index = match.index
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }

    return `_v(${tokens.join('+')})`
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

  return `${str.slice(0, -1)}`
}