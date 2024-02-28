import { observer } from "./observe/index"

export function initState(vm) {
  let opts = vm.$options

  if (opts.data) {
    initData(vm)
  }

  if (opts.props) {

  }

}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      proxy(vm,'_data',key)
    }
  }

  //数据劫持
  observer(data)
}


function proxy(vm,source,key){
  Object.defineProperty(vm,key,{
    get(){
      return vm[source][key]
    },
    set(newValue){
      vm[source][key] = newValue
    }
  })
}