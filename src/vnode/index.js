export function renderMixin(Vue) {

  //标签
  Vue.prototype._c = function () {
    return createElment(...arguments)
  }

  //文本
  Vue.prototype._v = function (text) {
    return createText(text)
  }

  //变量
  Vue.prototype._s = function (val) {
    return val == null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
  }

  Vue.prototype._render = function () {
    let vm = this
    let render = vm.$options.render
    let vnode = render.call(this)
    return vnode
  }
}

function createElment(tag, data = {}, ...children) {
  return vnode(tag, data, data?.key, children)
}

function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}