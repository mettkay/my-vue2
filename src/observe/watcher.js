// watcher 实现 数据更新

import { nextTick } from "../utils/nextTick"
import { popTarget, pushTarget } from "./dep"

class Watcher {
  constructor(vm, exprOrfn, cb, options) {
    this.id = 0
    this.vm = vm
    this.exprOrfn = exprOrfn
    this.cb = cb
    this.options = options
    this.user = !!options.user
    this.deps = []
    this.depsId = new Set()

    if (typeof exprOrfn === 'function') {
      this.getter = exprOrfn
    } else {
      this.getter = function () {
        let path = exprOrfn.split('.')
        let obj = vm
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]]
        }
        return obj
      }
    }

    this.value = this.get()
  }
  get() {

    pushTarget(this)

    let value = this.getter()

    popTarget()

    return value
  }

  run() {
    let value = this.get()
    let oldValue = this.value
    this.value = value

    if(this.user){
      this.cb.call(this.vm,value,oldValue)
    }
  }

  updata() {
    // this.get()
    queueWatcher(this)
  }

  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
}

let queue = []
let has = {}
let pending = false

function flushWatcher() {
  queue.forEach(e => { e.run() });
  queue = []
  has = {}
  pending = false
}

function queueWatcher(watcher) {
  let id = watcher.id
  if (!has[id]) {
    queue.push(watcher)
    has[id] = 0

    if (!pending) {
      nextTick(flushWatcher)
      pending = true
    }
  }
}

export default Watcher