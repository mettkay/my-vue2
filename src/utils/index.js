export const HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
];


let starts = {}
starts.data = function(parentVal,childVal){
  return childVal
}
starts.computed = function(){}
starts.watch = function(parentVal,childVal){
  return childVal
}
starts.methods = function(){}

HOOKS.forEach(hook=>{
  starts[hook] = mergeHook
})

function mergeHook(parentVal,childVal){
  if(childVal){
    if(parentVal){
      return parentVal.concat(childVal)
    }else{
      return [childVal]
    }
  }else{
    return parentVal
  }
}

export function mergeOptions(parent,children){

  const options = {}

  for (const key in parent) {
    mergeField(key)
  }

  for (const key in children) {
    mergeField(key)
  }

  function mergeField(key){
    if(starts[key]){
      options[key] = starts[key](parent[key],children[key])
    }else{
      options[key] = children[key]
    }
  }

  return options
}