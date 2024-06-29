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
starts.computed = function(parentVal,childVal){
  return childVal
}
starts.watch = function(parentVal,childVal){
  return childVal
}
starts.methods = function(parentVal,childVal){
  return childVal
}

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
      options[key] = children[key] || parent[key]
    }
  }

  return options
}


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function (val) { return map[val.toLowerCase()]; } : function (val) { return map[val]; };
}

var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot');

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);



export var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};