import { ArrayMethods } from "./arr"
import Dep from "./dep"

export function observer(data){
  if(typeof data !== 'object' || data === null){
    return data
  }
  return new Observer(data)
}

class Observer{
  constructor(value){

    Object.defineProperty(value,"__ob__",{
      enumerable:false,
      configurable: true,
      value:this
    })

    this.dep = new Dep()

    if(Array.isArray(value)){
      value.__proto__ = ArrayMethods

      this.observeArray(value)
    }else{
      this.walk(value)
    }
  }
  walk(data){
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = data[key];
      defineReactive(data,key,value)
    }
  }
  observeArray(value){
    value.forEach(e => {
      observer(e)
    });
  }
}

function defineReactive(data,key,value){
  let ob = observer(value)

  let dep = new Dep()

  Object.defineProperty(data,key,{
    get(){
      if(Dep.target){
        dep.depend()
        if(ob?.dep){
          ob.dep.depend()
        }
      }
      return value
    },
    set(newValue){
      if(newValue === value) return
      observer(newValue)
      value = newValue
      dep.notify()
    }
  })
}