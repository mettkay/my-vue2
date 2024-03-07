import {
  compileToFunction
} from "./compile/index"
import {
  initState
} from "./initState"
import {
  callHook,
  mounetComponent
} from "./lifecycle"
import { mergeOptions } from "./utils/index"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {

    const vm = this
    vm.$options = mergeOptions(Vue.options,options)
    
    callHook(vm,'beforeCreate')
    
    initState(vm)

    callHook(vm,'created')
    
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    el = document.querySelector(el)
    vm.$el = el
    const options = vm.$options
    if (!options.render) {
      const template = options.template
      if (!template && el) {
        el = el.outerHTML
        const render = compileToFunction(el)

        options.render = render
      }
    }

    mounetComponent(vm, el)
  }
}