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
    this.lazy = options.lazy
    this.dirty = this.lazy

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

    this.value = this.lazy ? void 0 : this.get()
  }
  get() {

    pushTarget(this)

    let value = this.getter.call(this.vm);

    popTarget()

    return value
  }

  run() {
    let value = this.get()
    let oldValue = this.value
    this.value = value

    if (this.user) {
      this.cb.call(this.vm, value, oldValue)
    }
  }

  update() {
    if (this.lazy) {
      this.dirty = true;
    }
    else {
      queueWatcher(this);
    }
  }

  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  evaluate() {
    this.value = this.get();
    this.dirty = false
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
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