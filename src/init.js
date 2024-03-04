import {
  compileToFunction
} from "./compile/index"
import {
  initState
} from "./initState"
import {
  mounetComponent
} from "./lifecycle"

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {

    const vm = this
    vm.$options = options

    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    el = document.querySelector(el)
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