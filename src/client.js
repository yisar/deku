const ws = new WebSocket('ws://localhost:8080/')

ws.onmessage = function (e) {
  const { timestamp } = JSON.parse(e.data)
  document.body.innerHTML = ''
  import('./index.js' + `?t=${timestamp}`)
}

