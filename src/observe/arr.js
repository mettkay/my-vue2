let oldArrayProtoMethods = Array.prototype

export let ArrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
  "push",
  "pop",
  "unshift",
  "shift",
  "splice"
]

methods.forEach(item=>{
  ArrayMethods[item] = function (...args){
    const result = oldArrayProtoMethods[item].apply(this,args)

    let inserted

    switch (item) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.splice(2)
        break;
    }

    let ob = this.__ob__
    if(inserted){
      ob.observeArray(inserted)
    }

    ob.dep.notify()

    return result
  }
})