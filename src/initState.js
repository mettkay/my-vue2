import { observer } from "./observe/index"
import { nextTick } from "./utils/nextTick"
import Watcher from "./observe/watcher"
import Dep from "./observe/dep";

export function initState(vm) {
  let opts = vm.$options

  if (opts.data) {
    initData(vm)
  }

  if (opts.props) {
    initProps(vm)
  }

  if (opts.watch) {
    initWatch(vm)
  }

  if (opts.computed) {
    initComputed(vm)
  }

}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      proxy(vm, '_data', key)
    }
  }

  //数据劫持
  observer(data)
}


function initComputed(vm) {
  let computed = vm.$options.computed

  let watcher = vm._computedWatchers = {}

  for (let key in computed) {
    let userDef = computed[key]
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    watcher[key] = new Watcher(vm, getter, () => { }, { lazy: true })
    defineComputed(vm, key, userDef)
  }
}

function defineComputed(vm, key, userDef) {
  let sharedPropDefinition = {
    configurable: true,
    enumerable: true
  }

  if (typeof userDef === 'function') {
    sharedPropDefinition.get = createComputedGetter(key)
  } else {
    sharedPropDefinition.get = createComputedGetter(key)
    sharedPropDefinition.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedPropDefinition)
}

function createComputedGetter(key) {
  return function () {
    let watcher = this._computedWatchers[key]
    if (watcher) {
      if(watcher.dirty){
        watcher.evaluate()
      }
      if(Dep.target){
        watcher.depend()
      }
    }
    return watcher.value
  }
}

function initProps(vm) {

}

function initWatch(vm) {
  let watch = vm.$options.watch

  for (const key in watch) {
    const handler = watch[key];

    if (Array.isArray(handler)) {
      handler.forEach(item => {
        createWatcher(vm, key, item)
      })
    } else {
      createWatcher(vm, key, handler)
    }
  }
}


function createWatcher(vm, exprOrfn, handler, options) {
  if (typeof handler === 'object') {
    options = handler
    handler = handler.handler
  }

  if (typeof handler === 'string') {
    handler = vm[handler]
  }

  return vm.$watch(vm, exprOrfn, handler, options)
}


function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb)
  }

  Vue.prototype.$watch = function (vm, exprOrfn, handler, options = {}) {

    new Watcher(vm, exprOrfn, handler, { ...options, user: true })

    if (options.immediate) {
      handler.call(vm)
    }
  }
}