// watcher 实现 数据更新

class Watcher {
  constructor(vm, updataComponent, cb, options) {
    this.vm = vm
    this.exprOrfn = updataComponent
    this.cb = cb
    this.options = options

    if (typeof updataComponent === 'function') {
      this.getter = updataComponent
    }

    this.get()
  }
  get() {
    this.getter()
  }
}

export default Watcher