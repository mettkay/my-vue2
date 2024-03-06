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

export function mergeOptions(parent,children){

  const options = {}

  for (const key in parent) {
    mergeField(key)
  }

  for (const key in children) {
    mergeField(key)
  }

  function mergeField(key){
    if(start[key]){
      options[key] = starts[key](parent[key],children[key])
    }else{
      options[key] = children[key]
    }
  }
}