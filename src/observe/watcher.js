// watcher 实现 数据更新

import { nextTick } from "../utils/nextTick"
import { popTarget, pushTarget } from "./dep"

class Watcher {
  constructor(vm, updataComponent, cb, options) {
    this.id = 0
    this.vm = vm
    this.exprOrfn = updataComponent
    this.cb = cb
    this.options = options
    this.deps = []
    this.depsId = new Set()

    if (typeof updataComponent === 'function') {
      this.getter = updataComponent
    }

    this.get()
  }
  get() {

    pushTarget(this)

    this.getter()

    popTarget()
  }

  run() {
    this.get()
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
  queue.forEach(e => { e.run(); e.cb() });
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