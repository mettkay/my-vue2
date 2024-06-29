import { mergeOptions } from "../utils/index"

export function initGlobApi(Vue) {
  Vue.options = {}
  Vue.Mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin)
  }

  Vue.options.components = {}

  Vue.component = function (id, componentDef) {
    componentDef.name = componentDef.name || id

    componentDef = this.extend(componentDef)
    this.options.components[id] = componentDef
  }

  Vue.extend = function (options) {
    let Super = this
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(Super.options,options)
    console.log('Sub.options:', Sub.options);
    return Sub
  }
}