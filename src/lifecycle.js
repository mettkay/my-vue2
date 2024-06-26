import Watcher from "./observe/watcher"
import { patch } from "./vnode/patch"

export function mounetComponent(vm, el) {

  callHook(vm,'beforeMounet')

  //  _render() 将render函数变成vnode
  //  _update() 将vnode变成真实dom 挂载到页面
  let updateComponent = ()=>{
    vm._update(vm._render())
  }

  new Watcher(vm,updateComponent,()=>{
    callHook(vm,'updated')
  },true)

  callHook(vm,'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this
    let prevVnode = vm._vnode
    if(!prevVnode){
      vm.$el = patch(vm.$el,vnode)
      vm._vnode = vnode
    }else{
      patch(prevVnode,vnode)
    }
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