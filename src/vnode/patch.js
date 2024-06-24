export function patch(oldVnode, vnode) {
  console.log('vnode:', vnode);
  console.log('oldVnode:', oldVnode);

  if (oldVnode.nodeType == 1) {
    let el = createEl(vnode)

    let parentEl = oldVnode.parentNode
    parentEl.insertBefore(el, oldVnode.nextsibling)

    parentEl.removeChild(oldVnode)
    return el
  } else {

    if (oldVnode.tag !== vnode.tag) {
      return oldVnode.el.parentNode.replaceChild(createEl(vnode), oldVnode.el)
    }

    if (!oldVnode.tag) {
      if (oldVnode.text !== vnode.text) {
        return oldVnode.el.textContent = vnode.text
      }
    }

    let el = vnode.el = oldVnode.el
    updateRpors(vnode, oldVnode.data)


    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []

    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChild(oldChildren, newChildren, el)
    } else if (oldChildren.length > 0) {
      el.innerHTML = ''
    } else if (newChildren.length > 0) {
      for (let i = 0; i < newChildren.length; i++) {
        const child = newChildren[i];
        el.appendChild(createEl(child))
      }
    }

    return el

  }

}

function updateChild(oldChildren, newChildren, el) {
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[oldStartIndex]
  let oldEndIndex = 0
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChildren[newStartIndex]
  let newEndIndex = 0
  let newEndVnode = newChildren[newEndIndex]

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)

      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    }

  }

  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i < newEndIndex; i++) {
      el.parent.appendChild(createEl(newChildren[i]))
    }
  }
}

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}

function updateRpors(vnode, oldProps = {}) {
  let newProps = vnode.data || {}
  let el = vnode.el

  for (const key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key)
    }
  }

  for (const key in newProps) {
    if (key === 'style') {
      for (const name in newProps.style) {
        el.style[name] = newProps.style[name]
      }
    } else if (key === 'class') {
      el.className = newProps.class
    } else {
      el.setAttribute(key, newProps[key])
    }

  }
}

export function createEl(vnode) {
  let { tag, children, key, data, text } = vnode

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateRpors(vnode,)
    if (children.length > 0) {
      children.forEach(e => {
        vnode.el.appendChild(createEl(e))
      });
    }
  } else {
    vnode.el = document.createTextNode(text)
  }

  return vnode.el
}