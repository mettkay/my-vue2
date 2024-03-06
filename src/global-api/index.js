import { mergeOptions } from "../utils/index"

export function initGlobApi(Vue) {
  Vue.options = {}
  Vue.Mixin = function (mixin) {
    mergeOptions(this.options,mixin)
  }
}