import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vnode/index"


function Vue(options){
  this._init(options)
}

initMixin(Vue)

lifecycleMixin(Vue) //生命周期

renderMixin(Vue) //虚拟dom

export default Vue