import { patch } from "./vnode/patch"

export function mounetComponent(vm, el) {
  //  _render() 将render函数变成vnode
  //  _updata() 将vnode变成真实dom 挂载到页面
  vm._updata(vm._render())
}

export function lifecycleMixin(Vue) {
  Vue.prototype._updata = function (vnode) {
    let vm = this
    vm.$el = patch(vm.$el,vnode)
  }
}