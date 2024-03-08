import Watcher from "./observe/watcher"
import { patch } from "./vnode/patch"

export function mounetComponent(vm, el) {

  callHook(vm,'beforeMounet')

  //  _render() 将render函数变成vnode
  //  _updata() 将vnode变成真实dom 挂载到页面
  let updataComponent = ()=>{
    vm._updata(vm._render())
  }

  new Watcher(vm,updataComponent,()=>{},true)

  callHook(vm,'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._updata = function (vnode) {
    let vm = this
    vm.$el = patch(vm.$el,vnode)
  }
}


export function callHook(vm,hook){
  const handles = vm.$options[hook]
  if(handles){
    handles.forEach(e => {
      e.call(this)
    });
  }
}