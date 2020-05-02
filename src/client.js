const ws = new WebSocket('ws://localhost:8080/')

ws.onmessage = function (e) {
  const { timestamp,path } = JSON.parse(e.data)
  console.log(path)
  document.body.innerHTML = ''
  import('./index.js' + `?t=${timestamp}`)
}
