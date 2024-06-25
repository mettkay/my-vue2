import { compileToFunction } from "./compile/index"
import { initGlobApi } from "./global-api/index"
import { initMixin } from "./init"
import { stateMixin } from "./initState"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"
import { patch, createEl } from "./vnode/patch"


function Vue(options) {
  this._init(options)
}

initMixin(Vue) //初始化mixin

lifecycleMixin(Vue) //生命周期

renderMixin(Vue) //虚拟dom

initGlobApi(Vue) //全局方法

stateMixin(Vue) //给 vm 添加 nextTick

export default Vue
