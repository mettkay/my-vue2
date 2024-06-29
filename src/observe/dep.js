
let id = 0
class Dep{
  constructor(){
    this.id = ++id
    this.subs = []
  }

  depend(){
    Dep.target.addDep(this)
  }

  addSub(watcher){
    this.subs.push(watcher)
  }

  notify(){
    this.subs.forEach(watcher=>{
      watcher.update()
    })
  }
}

Dep.target = null
let targetStack = []
export function pushTarget(watcher){
  Dep.target = watcher
  targetStack.push(watcher)
}

export function popTarget(){
  targetStack.pop()
  Dep.target = targetStack[targetStack.length-1]
}

export default Dep