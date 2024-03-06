export function patch(oldVnode,vnode){
  let el = createEl(vnode)

  let parentEl = oldVnode.parentNode
  parentEl.insertBefore(el,oldVnode.nextsibling)

  parentEl.removeChild(oldVnode)
  return el
}

function createEl(vnode){
  let {tag,children,key,data,text} = vnode

  if(typeof tag === 'string'){
    vnode.el = document.createElement(tag)
    if(children.length > 0){
      children.forEach(e => {
        vnode.el.appendChild(createEl(e))
      });
    }
  }else{
    vnode.el =  document.createTextNode(text)
  }
  
  return vnode.el
}