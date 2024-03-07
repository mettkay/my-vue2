import { mergeOptions } from "../utils/index"

export function initGlobApi(Vue) {
  Vue.options = {}
  Vue.Mixin = function (mixin) {
    this.options = mergeOptions(this.options,mixin)
  }
}