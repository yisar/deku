const ws = new WebSocket('ws://localhost:4000/')
ws.onopen = () => console.log('opened.')
ws.onmessage = (e) => {
  const { timestamp, path } = JSON.parse(e.data)
  console.log(path)
  document.body.innerHTML = ''
  import('./index.js' + `?t=${timestamp}`)
}

ws.onerror = (e) => console.error(e)
ws.onclose = (e) => console.log('closed.')
