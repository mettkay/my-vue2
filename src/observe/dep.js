class Dep{
  constructor(){
    this.subs = []
  }

  depend(){
    this.subs.push()
  }

  notify(){
    this.subs.forEach(watcher=>{
      watcher.updata()
    })
  }
}

Dep.target = null

export function pushTarget(watcher){
  Dep.target = watcher
}

export function popTarget(){
  Dep.target = null
}

export default Dep