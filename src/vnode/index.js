import { isReservedTag } from "../utils/index"

export function renderMixin(Vue) {

  //标签
  Vue.prototype._c = function () {
    return createElement(this, ...arguments)
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

function createElement(vm, tag, data = {}, ...children) {
  if (isReservedTag(tag)) {
    return vnode(vm, tag, data, data?.key, children)
  } else {
    let Ctor = vm.$options['components'][tag]
    return createComponent(vm, tag, data, children, Ctor)
  }
}

function createComponent(vm, tag, data, children, Ctor) {
  if (typeof Ctor === 'object') {
    Ctor = vm.constructor.extend(Ctor);
  }

  data.hook = {
    init(vnode) {
      let { options } = vnode.componentOptions.Ctor
      let child = vnode.componentInstance = new vnode.componentOptions.Ctor(options)
      child.$mount()
    }
  }

  return vnode(vm, 'vue-component-' + tag, data, undefined, undefined, undefined, { Ctor, children })
}

function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  }
}