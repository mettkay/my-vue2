
let callback = []
let pending = false


let timerFunc

if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flush)
  }
} else if (MutationObserver) {
  let observe = new MutationObserver(flush)
  let textNode = document.createTextNode(2)
  observe.observe(textNode, { characterData: true })
  timerFunc = () => {
    textNode.textContent = 2
  }
}

function flush() {
  callback.forEach(e => e())
  pending = false
}

export function nextTick(cb) {
  callback.push(cb)

  if (!pending) {
    timerFunc()
  }
  pending = true
}