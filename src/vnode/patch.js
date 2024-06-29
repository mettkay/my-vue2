export function patch(oldVnode, vnode) {

  if(!oldVnode){
    createEl(vnode)
    return
  }

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

function updateChild(oldChildren, newChildren, parent) {
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[oldStartIndex]
  let oldEndIndex = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChildren[newStartIndex]
  let newEndIndex = newChildren.length - 1
  let newEndVnode = newChildren[newEndIndex]

  let oldMap = {}
  oldChildren.forEach((item, index) => {
    if (item.key) {
      oldMap[item.key] = index
    }
  })

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {

    if (isSameVnode(oldStartVnode, newStartVnode)) {
      //新前比旧前
      patch(oldStartVnode, newStartVnode)

      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      //新后比旧后
      patch(oldEndVnode, newEndVnode)

      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      //新后比旧前
      patch(oldStartVnode, newEndVnode)

      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      //新前比旧后
      patch(oldEndVnode, newStartVnode)

      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      //暴力比对

      let moveIndex = oldMap[newStartVnode.key]

      if (moveIndex === undefined) {
        parent.insertBefore(createEl(newStartVnode), oldStartVnode.el)
      } else {
        let moveVnode = oldChildren[moveIndex]
        oldChildren[moveIndex] = null
        parent.insertBefore(moveVnode.el, oldStartVnode.el)
        patch(moveVnode, newStartVnode)
      }

      newStartVnode = newChildren[++newStartIndex]

    }
  }

  //添加新的多余的元素
  if (newStartIndex <= newEndIndex) {
    let el = parent.children[newStartIndex] || null
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.insertBefore(createEl(newChildren[i]), el)
    }
  }

  //删除旧的多余的元素
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; ++i) {
      let child = oldChildren[i]
      if (child != null) {
        parent.removeChild(child.el)
      }
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

  let newStyle = newProps.style || {}
  let oldStyle = oldProps?.style || {}

  for (const key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = ''
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
  
  let { vm, tag, children, key, data, text } = vnode
  
  if (typeof tag === 'string') {
    if (createComponentEl(vnode)) {
      vnode.componentInstance.$el = vnode.componentInstance._vnode.el
      return vnode.componentInstance.$el
    } else {
      vnode.el = document.createElement(tag)
      updateRpors(vnode)
      if (children.length > 0) {
        
        children.forEach(e => {
          vnode.el.appendChild(createEl(e))
        });
      }
    }

  } else {
    vnode.el = document.createTextNode(text)
  }

  return vnode.el
}

export function createComponentEl(vnode) {
  let i = vnode.data
  if ((i = i.hook) && (i = i.init)) {
    i(vnode)
  }

  if(vnode.componentInstance){
    return true
  }
  return false
}