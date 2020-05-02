const ws = new WebSocket('ws://localhost:8080/')

ws.onmessage = function (e) {
  const {path, timestamp } = JSON.parse(e.data)
  document.body.innerHTML = ''
  const scripts = document.getElementsByTagName('script')
  const path = scripts[scripts.length - 1].src
  import(path + `?t=${timestamp}`)
}

