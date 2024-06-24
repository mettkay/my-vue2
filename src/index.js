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


let vm1 = new Vue({ data: '张三' })
let render1 = compileToFunction(`<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>`)

let vnode1 = render1.call(vm1)
document.body.appendChild(createEl(vnode1))

let vm2 = new Vue({ data: '李四' })
let render2 = compileToFunction(`<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
  <li>d</li>
</ul>`)
let vnode2 = render2.call(vm2)

setTimeout(() => {
  patch(vnode1, vnode2)
}, 1000);