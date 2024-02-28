import { compileToFunction } from "./compile/index"
import { initState } from "./initState"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {

    const vm = this
    vm.$options = options

    initState(vm)

    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el){
    const vm = this
    el = document.querySelector(el)
    const options = vm.$options
    if(!options.render){
      const template = options.template
      if(!template && el){
        const ast = compileToFunction(el)
      }
    }
  }
}