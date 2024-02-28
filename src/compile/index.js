
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
var startTagOpen = new RegExp("^<".concat(qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

function parseHtml(){
  while(html){
    let textEnd = html.indexOf('<')
    if(textEnd === 0){
      const startTag = parseStartTag()
    }
  }

  function parseStartTag(){
    const satrt = html.match(startTagOpen) 
    console.log('%c 🥧 satrt: ', 'font-size:20px;background-color: #FCA650;color:#fff;', satrt);
  }
}



export function compileToFunction(el){
  console.log('%c 🍓 el: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', el);
  let ast = parseHtml(template)
}