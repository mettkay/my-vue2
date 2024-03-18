import { observer } from "./observe/index"
import { nextTick } from "./utils/nextTick"

export function initState(vm) {
  let opts = vm.$options

  if (opts.data) {
    initData(vm)
  }

  if (opts.props) {

  }

  if (opts.watch) {
    initWatch(vm)
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

  return vm.$watch(exprOrfn, handler, options)
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

export function stateMixin(vm) {
  vm.prototype.$nextTick = function (cb) {
    nextTick(cb)
  }

  vm.prototype.$watch = function (exprOrfn, handler, options) {
    console.log('exprOrfn:', exprOrfn);
    console.log('handler:', handler);
    console.log('options:', options);

  }
}