var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
var startTagOpen = new RegExp("^<".concat(qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;


export function parseHtml(html) {
  while (html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      const startTagMatch = parseStartTag()
      if(startTagMatch){
        start(startTagMatch.tagName,startTagMatch.attrs)
        continue
      }

      let endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
    }

    if(textEnd > 0){
      let text = html.substring(0,textEnd)
      if(text){
        charts(text)
        advance(text.length)
      }
    }
    
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if(!start) return

    let match = {
      tagName: start[1],
      attrs: []
    }

    advance(start[0].length)

    let attr, end
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5]
      })

      advance(attr[0].length)
    }

    if(end){
      advance(end[0].length)
      return match
    }
  }

  function advance(len) {
    html = html.substring(len)
  }

  return root
}


let root,createParent
let stack = []

//开始标签
function start(tag,attrs){
  let element = createASTElement(tag,attrs)
  if(!root){
    root = element
  }
  createParent = element
  stack.push(element)
}

//文本
function charts(text){
  text = text.replace(/\s/g,'')
  if(text){
    createParent.children.push({
      type:3,
      text
    })
  }
}


//结束标签
function end(tag){
  let element = stack.pop()
  createParent = stack[stack.length-1]
  if(createParent){
    element.parent = createParent
    createParent.children.push(element)
  }
}

function createASTElement(tag,attrs){
  return {
    tag,
    attrs,
    children:[],
    type:1,
    parent:null
  }
}